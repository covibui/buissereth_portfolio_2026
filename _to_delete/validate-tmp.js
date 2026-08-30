const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const isStr = (v) => typeof v === "string";
const isOptStr = (v) => v === undefined || isStr(v);
const isNum = (v) => typeof v === "number" && !Number.isNaN(v);
const isBool = (v) => typeof v === "boolean";
const isStrArr = (v) => Array.isArray(v) && v.every(isStr);
const isOptStrArr = (v) => v === undefined || isStrArr(v);

function checkDir(dir, name, guard) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const slugs = new Map();
  const orders = new Map();
  let ok = true;
  for (const f of files) {
    const fileId = path.basename(f, ".md");
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    const problems = guard(data);
    if (problems.length) {
      ok = false;
      console.log(`  FAIL ${f}: ${problems.join(", ")}`);
      continue;
    }
    const slug = typeof data.slug === "string" && data.slug ? data.slug : fileId;
    if (slugs.has(slug)) { ok = false; console.log(`  FAIL duplicate slug "${slug}": ${slugs.get(slug)} and ${f}`); }
    slugs.set(slug, f);
    if (orders.has(data.order)) { ok = false; console.log(`  FAIL duplicate order ${data.order}: ${orders.get(data.order)} and ${f}`); }
    orders.set(data.order, f);
    console.log(`  ok  ${fileId.padEnd(20)} order=${String(data.order).padEnd(3)} -> /${slug}`);
  }
  console.log(`${name}: ${files.length} files, ${ok ? "ALL VALID" : "ERRORS ABOVE"}\n`);
  return ok;
}

const postGuard = (d) => {
  const p = [];
  if (!isStr(d.title)) p.push("title");
  if (!isOptStr(d.slug)) p.push("slug");
  if (!isStr(d.client)) p.push("client");
  if (!isStr(d.year)) p.push("year");
  if (!isStrArr(d.disciplines)) p.push("disciplines");
  if (!isStr(d.summary)) p.push("summary");
  if (!isNum(d.order)) p.push("order");
  if (!isBool(d.featured)) p.push("featured");
  if (!isOptStr(d.coverLabel)) p.push("coverLabel");
  if (!isOptStrArr(d.gallery)) p.push("gallery");
  return p;
};

const projGuard = (d) => {
  const p = [];
  if (!isStr(d.title)) p.push("title");
  if (!isOptStr(d.slug)) p.push("slug");
  if (!isNum(d.order)) p.push("order");
  if (!isStr(d.category)) p.push("category");
  if (!isStrArr(d.tags)) p.push("tags");
  if (!isStr(d.imageLabel)) p.push("imageLabel");
  return p;
};

const a = checkDir("content/posts", "content/posts", postGuard);
const b = checkDir("content/personal-projects", "content/personal-projects", projGuard);
process.exit(a && b ? 0 : 1);
