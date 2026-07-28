# Anrotex Brand Tokens

Source: `source/WelcomNote-Anrotex.pdf`

Extracted from the PDF's embedded text, vector fills, and strokes, then checked
against rendered pages. The source does not explicitly label colors as
"primary" or "secondary"; the roles below are inferred from prominence and
usage throughout the document.

## Core palette

| Role | Token | Hex | RGB | Typical use observed |
| --- | --- | --- | --- | --- |
| Primary | Deep navy | `#09324A` | `9, 50, 74` | Main brand color, headings, dark backgrounds, icons |
| Primary neutral | Warm off-white | `#F3F2EA` | `243, 242, 234` | Main light background and light text |
| Secondary | Soft mint | `#AED0C9` | `174, 208, 201` | Supporting shapes, rules, icons, heading accents |
| Accent | Electric yellow | `#FFFB08` | `255, 251, 8` | Numbers, highlights, calls to action |
| Secondary | Deep teal | `#1B6F81` | `27, 111, 129` | Secondary headings and emphasis on light backgrounds |
| Supporting neutral | Warm stone | `#DAD7C8` | `218, 215, 200` | Large soft background shapes and muted text |
| Utility neutral | Black | `#000000` | `0, 0, 0` | Body copy/signature where pure black is required |

One additional value, `#00C2CB`, occurs once in a stray or clipped period on
page 1. It is retained in the machine-readable tokens as `cyan-artifact`, but
should not be treated as part of the website palette unless the final brand
book confirms it.

## Typography

Primary family: **Urbanist**

Observed weights:

| PDF face | CSS weight |
| --- | --- |
| Urbanist Thin | `100` |
| Urbanist Light | `300` |
| Urbanist Regular | `400` |
| Urbanist Medium | `500` |
| Urbanist SemiBold | `600` |
| Urbanist Bold | `700` |

Recommended web stack:

```css
font-family: "Urbanist", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

`Cooper Black` is embedded only for oversized quotation-mark glyphs on page 2.
It is decorative artwork in this document, not the primary brand or website
typeface.

## Recommended semantic mapping

- Page background: warm off-white
- Primary text and headings: deep navy
- Dark-section text: warm off-white
- Supporting dark-section headings and rules: soft mint
- Highlights and interactive accents: electric yellow
- Secondary emphasis on light surfaces: deep teal
- Large subtle background forms: warm stone

Avoid using electric yellow for small text on light backgrounds. It works best
as a fill or accent paired with deep navy.
