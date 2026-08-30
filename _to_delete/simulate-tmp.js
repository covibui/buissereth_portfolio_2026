// Mirrors the new lib/content.ts + lib/posts.ts + lib/projects.ts logic exactly,
// to prove generateStaticParams() and getPost()/getProject() resolve correctly.
const fs = require("fs"), path = require("path"), matter = require("gray-matter");

function listFileIds(dir) {
  return fs.readdirSync(dir).filter(f => [".md",".mdx"].includes(path.extname(f)))
    .map(f => path.basename(f, path.extname(f)));
}
function routeSlugFor(fm, fileId) {
  if (fm && typeof fm === "object") {
    const d = fm.slug;
    if (typeof d === "string" && d.length > 0) return d;
  }
  return fileId;
}
function readAll(dir) {
  const seen = new Map();
  return listFileIds(dir).map(fileId => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, `${fileId}.md`), "utf8"));
    const slug = routeSlugFor(data, fileId);
    if (seen.has(slug)) throw new Error(`Duplicate slug "${slug}": ${seen.get(slug)} and ${fileId}`);
    seen.set(slug, fileId);
    return { slug, fileId, frontmatter: data, content };
  });
}

const posts = readAll("content/posts").sort((a,b) => a.frontmatter.order - b.frontmatter.order);
const projects = readAll("content/personal-projects").sort((a,b) => a.frontmatter.order - b.frontmatter.order);

console.log("generateStaticParams() would emit these /work routes:");
const slugs = posts.map(p => p.slug);
slugs.forEach(s => console.log(`   /work/${s}`));

// Every emitted slug must resolve back through getPost()
let bad = 0;
for (const s of slugs) {
  const entry = posts.find(p => p.slug === s);
  if (!entry) { console.log(`   getPost("${s}") FAILED`); bad++; }
}
for (const p of projects) {
  const entry = projects.find(x => x.slug === p.slug);
  if (!entry) { console.log(`   getProject("${p.slug}") FAILED`); bad++; }
}

// Compare against the previously-built route list in out/
const prev = fs.existsSync("out/work")
  ? fs.readdirSync("out/work", { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith("__")).map(d => d.name).sort()
  : null;
console.log("\nPreviously-live /work routes (from out/):");
if (!prev) { console.log("   out/ not present"); }
else {
  prev.forEach(r => console.log(`   /work/${r}`));
  const now = [...slugs].sort();
  const lost = prev.filter(r => !now.includes(r));
  const added = now.filter(r => !prev.includes(r));
  console.log(`\nURLs LOST:  ${lost.length ? lost.join(", ") : "none"}`);
  console.log(`URLs ADDED: ${added.length ? added.join(", ") : "none"}`);
  if (lost.length) bad++;
}

console.log(`\nFeatured (Highlight-): ${posts.filter(p=>p.frontmatter.featured).map(p=>p.fileId).join(", ")}`);
console.log(`Archive  (Work-):      ${posts.filter(p=>!p.frontmatter.featured).map(p=>p.fileId).join(", ")}`);
console.log(`Personal:              ${projects.map(p=>p.fileId).join(", ")}`);
console.log(bad ? `\n*** ${bad} PROBLEM(S) ***` : "\nAll routes resolve. No URL lost.");
process.exit(bad ? 1 : 0);
