import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, path = "" }) {
  const siteUrl = "https://smartbee.me";
  const defaultDesc =
    "Anastasia Hnylytska — DevOps / Platform Engineer. GCP, Azure, Terraform, Kubernetes, CI/CD.";

  return (
    <Helmet>
      <title>
        {title ? `${title} | SmartBee` : "SmartBee — DevOps & Platform Engineer"}
      </title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={`${siteUrl}${path}`} />
      <meta property="og:title" content={title || "SmartBee"} />
      <meta
        property="og:description"
        content={description || defaultDesc}
      />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
    </Helmet>
  );
}
