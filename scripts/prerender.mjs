import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const routes = [
  "/",
  "/services",
  "/solutions",
  "/case-studies",
  "/contact",
  "/aws-cost-optimization",
  "/kubernetes-scaling",
  "/ci-cd-automation",
  "/devops-consulting",
  "/blog",
  "/blog/reduce-aws-costs",
  "/blog/cicd-best-practices",
  "/blog/kubernetes-scaling-best-practices",
];

const projectRoot = process.cwd();
const distDirectory = path.join(projectRoot, "dist");
const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
const serverEntry = pathToFileURL(
  path.join(projectRoot, "dist-ssr", "entry-server.js"),
).href;
const { render } = await import(serverEntry);

for (const route of routes) {
  const { html, head } = render(route);
  const document = template
    .replace("<!--seo-head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const outputDirectory =
    route === "/" ? distDirectory : path.join(distDirectory, route.slice(1));

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, "index.html"), document);
}

console.log(`Prerendered ${routes.length} SEO-ready routes.`);
