const React = require("react");
const ReactPDF = require("@react-pdf/renderer");
const path = require("path");
const fs = require("fs");

const ResumeDocument = require("./ResumeDocument");

const e = React.createElement;

const LANGUAGES = ["en", "ua"];
const OUTPUT_DIR = path.resolve(__dirname, "..", "..", "public");

async function main() {
  console.log("Resume PDF Generator — HiveOps");
  console.log("================================");
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  for (const lang of LANGUAGES) {
    const filename = `CV_Anastasia_Hnylytska_${lang.toUpperCase()}.pdf`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    console.log(`  Generating ${lang.toUpperCase()} -> ${filename}`);

    try {
      const doc = e(ResumeDocument, { lang });
      await ReactPDF.renderToFile(doc, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`  Done: ${filename} (${(stats.size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  ERROR generating ${filename}:`, err.message);
      console.error(err.stack);
    }
  }

  console.log("\n================================");
  console.log("Generation complete!\n");

  const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.startsWith("CV_Anastasia_") && f.endsWith(".pdf"));
  files.sort();
  files.forEach((f) => {
    const stats = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  ${f} (${(stats.size / 1024).toFixed(0)} KB)`);
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
