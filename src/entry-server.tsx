import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import App from "./App";

export function render(url: string) {
  return new Promise<{ html: string; head: string }>((resolve, reject) => {
    const output = new PassThrough();
    let html = "";
    output.setEncoding("utf8");
    output.on("data", (chunk) => { html += chunk; });
    output.on("error", reject);
    output.on("end", () => {
      const helmet = Helmet.renderStatic();
      const head = [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].filter(Boolean).join("\n    ");
      resolve({ html, head });
    });

    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        // Static pages must include the resolved route, never a loading fallback.
        onAllReady() { pipe(output); },
        onError: reject,
      },
    );
  });
}
