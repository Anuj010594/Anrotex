export const SITE_URL = "https://www.anrotex.com";
export const SITE_NAME = "Anrotex";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

export type JsonLd = Record<string, unknown>;

export const organizationSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/company/anrotex-solutions/"],
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/Anrotex.png`,
    contentUrl: `${SITE_URL}/Anrotex.png`,
    width: 1254,
    height: 1254,
  },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "LLPIN",
    value: "ACY-8754",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "sales@anrotex.com",
    telephone: "+91-79727-02722",
  },
};

export const websiteSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en",
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: "Worldwide",
  };
}

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${path}#article`,
    headline,
    description,
    image: DEFAULT_OG_IMAGE,
    datePublished,
    dateModified,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@id": `${SITE_URL}${path}#webpage`,
    },
    inLanguage: "en",
  };
}

export function caseStudyArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${path}#case-study`,
    headline,
    description,
    image: DEFAULT_OG_IMAGE,
    datePublished,
    dateModified,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    about: [
      "AWS cost optimization",
      "Kubernetes",
      "CI/CD automation",
      "FinTech infrastructure",
    ],
    mainEntityOfPage: {
      "@id": `${SITE_URL}${path}#webpage`,
    },
    inLanguage: "en",
  };
}
