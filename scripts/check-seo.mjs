// Run after npm run build: node scripts/check-seo.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { render } from "../dist-ssr/entry-server.js";
import worker from "../worker/index.js";

const sitemap = await readFile("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
assert(urls.length > 0, "The sitemap must contain public pages");
const titles = new Set();
for (const url of urls) {
  const html = await readFile(`dist${url.pathname.replace(/\/$/, "")}/index.html`, "utf8");
  assert(html.includes(`rel="canonical" href="${url.href}"`), `Wrong canonical for ${url.pathname}`);
  assert.match(html, /<h1\b/, `Missing prerendered heading for ${url.pathname}`);
  assert(!html.includes("noindex"), `Public page is noindex: ${url.pathname}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Expected one main heading: ${url.pathname}`);
  const title = html.match(/<title\b[^>]*>([^<]+)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${url.pathname}`);
  titles.add(title);
  assert.match(html, /name="description" content="[^"]+"/, `Missing description: ${url.pathname}`);
  for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    assert(JSON.parse(json)["@type"], `Invalid structured data: ${url.pathname}`);
  }
  for (const [, href] of html.matchAll(/href="((?:\/|#)[^"]*)"/g)) {
    const { pathname, hash } = new URL(href, url);
    if (pathname.includes(".")) await readFile(`dist${pathname}`);
    else {
      assert(urls.some((page) => page.pathname === pathname), `Broken internal link: ${url.pathname} -> ${href}`);
      if (hash) {
        const target = pathname === url.pathname ? html : await readFile(`dist${pathname.replace(/\/$/, "")}/index.html`, "utf8");
        assert(target.includes(`id="${decodeURIComponent(hash.slice(1))}"`), `Missing anchor: ${url.pathname} -> ${href}`);
      }
    }
  }
}

const cicd = await readFile("dist/ci-cd-automation/index.html", "utf8");
assert.equal([...cicd.matchAll(/<details\b/g)].length, 5, "CI/CD FAQs must be in the initial HTML");
assert(cicd.includes("A previous application artifact is only useful"), "Missing FAQ answer in prerendered content");
assert(cicd.includes('href="/contact?focus=cicd"'), "Missing focused CI/CD enquiry link");
const { html: contact } = render("/contact?focus=cicd");
assert.match(contact, /<option[^>]*selected=""[^>]*>Improve deployment speed<\/option>/);

const aws = await readFile("dist/aws-cost-optimization/index.html", "utf8");
assert.equal([...aws.matchAll(/<details\b/g)].length, 6, "AWS FAQs must be in the initial HTML");
assert(aws.includes("Reducing covered usage can release capacity"), "Missing AWS FAQ answer in prerendered content");
assert(aws.includes('href="/contact?focus=aws-audit"'), "Missing focused AWS enquiry link");
assert.match(render("/contact?focus=aws-audit").html, /<option[^>]*selected=""[^>]*>AWS Cost Optimization Audit<\/option>/);

const notFound = await readFile("dist/404.html", "utf8");
assert.match(notFound, /<h1\b[^>]*>404<\/h1>/);
assert.match(notFound, /name="robots" content="noindex, nofollow"/);
const { rewrites } = JSON.parse(await readFile("vercel.json", "utf8"));
const publicPaths = new Set([...urls.map((url) => url.pathname), "/robots.txt", "/sitemap.xml"]);
for (const rewrite of rewrites) {
  assert(publicPaths.has(rewrite.source), `Unexpected route or catch-all: ${rewrite.source}`);
  await readFile(`dist${rewrite.destination}`);
}

const env = {
  ASSETS: {
    async fetch(request) {
      const pathname = new URL(request.url).pathname;
      try {
        return new Response(await readFile(`dist${pathname === "/" ? "/index.html" : pathname}`));
      } catch (error) {
        if (!["ENOENT", "EISDIR", "ENOTDIR"].includes(error.code)) throw error;
        return new Response("Not found", { status: 404 });
      }
    },
  },
};
for (const pathname of ["/blog/cicd-best-practices", "/does-not-exist", "/missing.js"]) {
  const response = await worker.fetch(new Request(`https://www.anrotex.com${pathname}`, {
    headers: { accept: pathname.endsWith(".js") ? "*/*" : "text/html" },
  }), env);
  assert.equal(response.status, pathname.startsWith("/blog/") ? 200 : 404);
  if (pathname === "/does-not-exist") assert.equal(await response.text(), notFound);
}
console.log(`Verified ${urls.length} prerendered pages, hosting routes, and missing-page responses.`);
