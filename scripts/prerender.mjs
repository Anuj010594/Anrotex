import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const routes = [
  "/",
  "/services",
  "/solutions",
  "/case-studies",
  "/case-studies/fintech-aws-cost-reduction",
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

for (const route of [...routes, "/404"]) {
  const { html, head } = render(route);
  const document = template
    .replace("<!--seo-head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const outputFile = route === "/404"
    ? path.join(distDirectory, "404.html")
    : path.join(distDirectory, route.slice(1), "index.html");

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, document);
}

console.log(`Prerendered ${routes.length} SEO-ready routes and a 404 page.`);
