import { Helmet } from "react-helmet";
import {
  DEFAULT_OG_IMAGE,
  JsonLd,
  organizationSchema,
  SITE_NAME,
  SITE_URL,
  websiteSchema,
} from "@/lib/seo";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData?: JsonLd | JsonLd[];
};

const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noIndex = false,
  structuredData = [],
}: SEOProps) => {
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const schemas = Array.isArray(structuredData) ? structuredData : [structuredData];
  const pageSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en",
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={imageAlt ?? `${SITE_NAME} cloud and DevOps consulting`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content={imageAlt ?? `${SITE_NAME} cloud and DevOps consulting`}
      />

      {[organizationSchema, websiteSchema, pageSchema, ...schemas].map((schema, index) => (
        <script type="application/ld+json" key={`schema-${index}`}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
