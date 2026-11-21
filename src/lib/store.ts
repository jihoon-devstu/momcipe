import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { seedRecipes } from "./catalog";
import { seedGuides, type Guide } from "./guides";
import { IMAGES } from "./images";
import type { Recipe } from "./types";

// FIREBASE_SERVICE_ACCOUNT 가 있으면 Firestore, 없으면 로컬 개발용 .data/<컬렉션>.json 에 저장.

interface Doc {
  id: string;
  order: number;
}

interface Store<T extends Doc> {
  list(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  put(doc: T): Promise<void>;
  remove(id: string): Promise<void>;
  putMany(docs: T[]): Promise<void>;
}

let dbPromise: Promise<FirebaseFirestore.Firestore> | undefined;
function firestore() {
  dbPromise ??= (async () => {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");
    if (!getApps().length) {
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT!.trim();
      const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
      initializeApp({ credential: cert(JSON.parse(json)) });
    }
    const db = getFirestore();
    // 사진 없는 항목의 image 처럼 비어 있는 선택 항목은 저장하지 않고 건너뛴다
    try {
      db.settings({ ignoreUndefinedProperties: true });
    } catch {
      // 개발 서버 재시작 등으로 이미 설정된 경우
    }
    return db;
  })();
  return dbPromise;
}

function firestoreStore<T extends Doc>(name: string): Store<T> {
  const col = async () => (await firestore()).collection(name);
  return {
    async list() {
      return (await (await col()).get()).docs.map((d) => d.data() as T);
    },
    async get(id) {
      const doc = await (await col()).doc(id).get();
      return doc.exists ? (doc.data() as T) : null;
    },
    async put(d) {
      await (await col()).doc(d.id).set(d);
    },
    async remove(id) {
      await (await col()).doc(id).delete();
    },
    async putMany(ds) {
      const c = await col();
      const batch = c.firestore.batch();
      ds.forEach((d) => batch.set(c.doc(d.id), d));
      await batch.commit();
    },
  };
}

function fileStore<T extends Doc>(name: string): Store<T> {
  const file = path.join(process.cwd(), ".data", `${name}.json`);
  const read = async (): Promise<Record<string, T>> => {
    try {
      return JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      return {};
    }
  };
  const write = async (all: Record<string, T>) => {
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
    async put(d) {
      const all = await read();
      all[d.id] = d;
      await write(all);
    },
    async remove(id) {
      const all = await read();
      delete all[id];
      await write(all);
    },
    async putMany(ds) {
      const all = await read();
      ds.forEach((d) => (all[d.id] = d));
      await write(all);
    },
  };
}

function collection<T extends Doc>(name: string, seed: () => T[]) {
  const s: Store<T> = process.env.FIREBASE_SERVICE_ACCOUNT ? firestoreStore<T>(name) : fileStore<T>(name);
  return {
    async list() {
      let all = await s.list();
      if (all.length === 0) {
        all = seed();
        await s.putMany(all);
      }
      return all.sort((a, b) => a.order - b.order);
    },
    get: (id: string) => s.get(id),
    save: (doc: T) => s.put(doc),
    remove: (id: string) => s.remove(id),
  };
}

const recipes = collection<Recipe>("recipes", () =>
  seedRecipes(Object.fromEntries(Object.entries(IMAGES).map(([k, v]) => [k, v.src]))),
);
export const listRecipes = recipes.list;
export const getRecipe = recipes.get;
export const saveRecipe = recipes.save;
export const deleteRecipe = recipes.remove;

const guides = collection<Guide>("guides", seedGuides);
export const listGuides = guides.list;
export const getGuide = guides.get;
export const saveGuide = guides.save;
export const deleteGuide = guides.remove;
