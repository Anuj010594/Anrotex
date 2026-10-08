import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const routes = [
  ["/", "Index"],
  ["/services", "ServicesPage"],
  ["/solutions", "SolutionsPage"],
  ["/case-studies", "CaseStudiesPage"],
  ["/case-studies/fintech-aws-cost-reduction", "case-studies/FintechAwsCostReduction"],
  ["/contact", "ContactPage"],
  ["/aws-cost-optimization", "AWSCostOptimization"],
  ["/kubernetes-scaling", "KubernetesScaling"],
  ["/ci-cd-automation", "CICDAutomation"],
  ["/devops-consulting", "DevOpsConsulting"],
  ["/blog", "Blog"],
  ["/blog/reduce-aws-costs", "blog/AwsCostReductionBlog"],
  ["/blog/cicd-best-practices", "blog/CICDBestPractices"],
  ["/blog/kubernetes-scaling-best-practices", "blog/KubernetesScalingBestPractices"],
];

const projectRoot = process.cwd();
const distDirectory = path.join(projectRoot, "dist");
const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
const serverEntry = pathToFileURL(
  path.join(projectRoot, "dist-ssr", "entry-server.js"),
).href;
const { render } = await import(serverEntry);

const manifest = JSON.parse(await readFile(path.join(distDirectory, ".vite/manifest.json"), "utf8"));

for (const [route, page] of [...routes, ["/404", "NotFound"]]) {
  const chunks = new Set();
  function collect(key) {
    if (chunks.has(key)) return;
    chunks.add(key);
    for (const dependency of manifest[key].imports ?? []) collect(dependency);
  }
  collect(`src/pages/${page}.tsx`);
  const preloads = [...chunks]
    .filter((key) => !manifest[key].isEntry)
    .map((key) => `<link rel="modulepreload" crossorigin href="/${manifest[key].file}" />`)
    .join("\n    ");
  const { html, head } = await render(route);
  const document = template
    .replace("<!--seo-head-->", `${head}\n    ${preloads}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const outputFile = route === "/404"
    ? path.join(distDirectory, "404.html")
    : path.join(distDirectory, route.slice(1), "index.html");

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, document);
}

console.log(`Prerendered ${routes.length} SEO-ready routes and a 404 page.`);
