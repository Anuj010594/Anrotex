import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import App from "./App";

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  const helmet = Helmet.renderStatic();
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  return { html, head };
}
