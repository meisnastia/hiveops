import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, path = "" }) {
  const siteUrl = "https://smartbee.me";
  const defaultDesc =
    "Anastasia Hnylytska — DevOps / Platform Engineer. GCP, Azure, Terraform, Kubernetes, CI/CD.";

  return (
    <Helmet>
      <title>
        {title ? `${title} | HiveOps` : "HiveOps — DevOps & Platform Engineer"}
      </title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={`${siteUrl}${path}`} />
      <meta property="og:title" content={title || "HiveOps"} />
      <meta
        property="og:description"
        content={description || defaultDesc}
      />
      <meta property="og:url" content={`${siteUrl}${path}`} />
    </Helmet>
  );
}
