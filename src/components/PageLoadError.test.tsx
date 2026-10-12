import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import PageLoadError from "./PageLoadError";

it("offers a full-page retry without dropping enquiry context or the section", () => {
  const html = renderToStaticMarkup(createElement(PageLoadError, {
    retryUrl: "/contact?focus=aws-audit&utm_source=linkedin#contact",
  }));

  expect(html).toContain('href="/contact?focus=aws-audit&amp;utm_source=linkedin#contact"');
  expect(html).toContain('href="mailto:sales@anrotex.com"');
  expect(html).toContain("Try again");
  expect(html).not.toMatch(/Failed to fetch|dynamic import|chunk|stack trace/i);
});
