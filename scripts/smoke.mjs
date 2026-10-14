// Smoke test against a running server: every page answers 200 with exactly one <h1>,
// unknown pages 404, and old URLs redirect. Usage: npm start & node scripts/smoke.mjs [baseUrl]
const base = process.argv[2] ?? "http://localhost:3000";

const pages = [
  "/", "/solutions", "/how-it-works", "/about", "/pricing", "/safeguards", "/book", "/assessment",
  "/assessment?workflow=lead-follow-up", "/legal/privacy", "/legal/terms",
  "/solutions/lead-follow-up", "/solutions/client-reporting", "/solutions/support-triage",
  "/solutions/invoice-follow-up", "/solutions/operations-intake",
];
const redirects = {
  "/systems": "/solutions",
  "/systems/lead-follow-up": "/solutions/lead-follow-up",
  "/company/about": "/about",
  "/company/contact": "/book",
  "/demo": "/book",
  "/signup": "/assessment",
  "/signin": "/",
  "/partners": "/about",
};

let failed = 0;
const fail = (msg) => {
  failed++;
  console.error("✗", msg);
};

for (const p of pages) {
  const res = await fetch(base + p);
  const html = await res.text();
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (res.status !== 200) fail(`${p} → ${res.status}`);
  else if (h1s !== 1) fail(`${p} has ${h1s} <h1>`);
  // Legal pages are the owner's text, carried over unchanged, so they're not checked for marketing claims.
  else if (!p.startsWith("/legal/") && /\$\d|money-back|SOC ?2|50\+/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) fail(`${p} contains a banned claim`);
  else console.log("✓", p);
}

for (const p of ["/nope", "/solutions/nope"]) {
  const res = await fetch(base + p);
  if (res.status !== 404) fail(`${p} → ${res.status}, expected 404`);
  else console.log("✓", p, "404");
}

for (const [from, to] of Object.entries(redirects)) {
  const res = await fetch(base + from, { redirect: "manual" });
  const loc = new URL(res.headers.get("location") ?? "", base).pathname;
  if (res.status !== 308 || loc !== to) fail(`${from} → ${res.status} ${loc}, expected 308 ${to}`);
  else console.log("✓", from, "→", to);
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");
