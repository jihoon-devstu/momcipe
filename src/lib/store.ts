import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { seedRecipes } from "./catalog";
import { IMAGES } from "./images";
import type { Recipe } from "./types";

// FIREBASE_SERVICE_ACCOUNT 가 있으면 Firestore, 없으면 로컬 개발용 .data/recipes.json 에 저장.

interface Store {
  list(): Promise<Recipe[]>;
  get(id: string): Promise<Recipe | null>;
  put(recipe: Recipe): Promise<void>;
  remove(id: string): Promise<void>;
  putMany(recipes: Recipe[]): Promise<void>;
}

const COLLECTION = "recipes";

async function firestoreStore(): Promise<Store> {
  const { getApps, initializeApp, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT!.trim();
    const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    initializeApp({ credential: cert(JSON.parse(json)) });
  }
  const col = getFirestore().collection(COLLECTION);
  return {
    async list() {
      const snap = await col.get();
      return snap.docs.map((d) => d.data() as Recipe);
    },
    async get(id) {
      const doc = await col.doc(id).get();
      return doc.exists ? (doc.data() as Recipe) : null;
    },
    async put(r) {
      await col.doc(r.id).set(r);
    },
    async remove(id) {
      await col.doc(id).delete();
    },
    async putMany(rs) {
      const batch = col.firestore.batch();
      rs.forEach((r) => batch.set(col.doc(r.id), r));
      await batch.commit();
    },
  };
}

function fileStore(): Store {
  const file = path.join(process.cwd(), ".data", "recipes.json");
  const read = async (): Promise<Record<string, Recipe>> => {
    try {
      return JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      return {};
    }
  };
  const write = async (all: Record<string, Recipe>) => {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(all, null, 2));
  };
  return {
    async list() {
      return Object.values(await read());
    },
    async get(id) {
      return (await read())[id] ?? null;
    },
    async put(r) {
      const all = await read();
      all[r.id] = r;
      await write(all);
    },
    async remove(id) {
      const all = await read();
      delete all[id];
      await write(all);
    },
    async putMany(rs) {
      const all = await read();
      rs.forEach((r) => (all[r.id] = r));
      await write(all);
    },
  };
}

let storePromise: Promise<Store> | undefined;
function store() {
  storePromise ??= process.env.FIREBASE_SERVICE_ACCOUNT ? firestoreStore() : Promise.resolve(fileStore());
  return storePromise;
}

export async function listRecipes(): Promise<Recipe[]> {
  const s = await store();
  let all = await s.list();
  if (all.length === 0) {
    all = seedRecipes(Object.fromEntries(Object.entries(IMAGES).map(([k, v]) => [k, v.src])));
    await s.putMany(all);
  }
  return all.sort((a, b) => a.order - b.order);
}

export async function getRecipe(id: string) {
  return (await store()).get(id);
}

export async function saveRecipe(recipe: Recipe) {
  await (await store()).put(recipe);
}

export async function deleteRecipe(id: string) {
  await (await store()).remove(id);
}
