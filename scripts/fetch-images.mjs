// Wikimedia Commons 에서 고른 사진을 내려받고 출처 정보(src/lib/images.ts)를 만든다.
// 사용법: node scripts/fetch-images.mjs scripts/image-picks.json
// 라이선스가 CC0 / Public domain / CC BY / CC BY-SA 가 아니면 받지 않는다.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ALLOWED = /^(cc0|public domain|cc by(-sa)? \d(\.\d)?( [a-z]{2})?)$/i;
const UA = { "User-Agent": "momcipe-image-fetch/0.1 (personal family recipe site)" };
const picks = JSON.parse(readFileSync(process.argv[2], "utf8"));
const outDir = path.join("public", "images", "recipes");
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function info(title) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  Object.entries({
    action: "query", format: "json", titles: title, prop: "imageinfo",
    iiprop: "url|extmetadata", iiurlwidth: "1600",
  }).forEach(([k, v]) => url.searchParams.set(k, v));
  for (let i = 0; ; i++) {
    await sleep(1500 + i * 4000);
    const text = await (await fetch(url, { headers: UA })).text();
    try {
      const page = Object.values(JSON.parse(text).query.pages)[0];
      return page.imageinfo[0];
    } catch {
      if (i > 5) throw new Error(`${title}: ${text.slice(0, 80)}`);
    }
  }
}

const credits = {};
for (const [id, title] of Object.entries(picks)) {
  const ii = await info(title);
  const m = ii.extmetadata;
  const license = strip(m.LicenseShortName?.value);
  if (!ALLOWED.test(license)) {
    console.warn(`SKIP ${id}: ${title} has license "${license}"`);
    continue;
  }
  const ext = path.extname(new URL(ii.thumburl).pathname).toLowerCase() || ".jpg";
  const file = `${id}${ext}`;
  let res;
  for (let i = 0; ; i++) {
    await sleep(1000 + i * 4000);
    res = await fetch(ii.thumburl, { headers: UA });
    if (res.ok || i > 4) break;
  }
  if (!res.ok) throw new Error(`${id}: download failed ${res.status}`);
  writeFileSync(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
  credits[id] = {
    src: `/images/recipes/${file}`,
    title: title.replace(/^File:/, ""),
    author: strip(m.Artist?.value) || "Unknown",
    license,
    licenseUrl: m.LicenseUrl?.value ?? "",
    source: ii.descriptionurl,
  };
  console.log(`OK ${id} ← ${title} (${license})`);
}

const body = `// scripts/fetch-images.mjs 로 생성됨. 직접 고치지 말고 스크립트를 다시 돌릴 것.
export interface ImageCredit {
  src: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export const IMAGES: Record<string, ImageCredit> = ${JSON.stringify(credits, null, 2)};
`;
writeFileSync(path.join("src", "lib", "images.ts"), body);
