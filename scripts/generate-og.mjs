import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;

// Load and resize Nastya's photo
const photoBuffer = readFileSync(resolve(root, "public/img/nastya.png"));
const photoBig = await sharp(photoBuffer)
  .resize({ height: 750, fit: "inside" })
  .flop() // horizontal flip — look left
  .toBuffer();
const bigMeta = await sharp(photoBig).metadata();

// Crop to fit canvas — take bottom portion (face + torso)
const cropTop = bigMeta.height - HEIGHT;
const cropLeft = Math.max(0, bigMeta.width - 500);
const photo = await sharp(photoBig)
  .extract({ left: cropLeft, top: Math.max(0, cropTop), width: Math.min(bigMeta.width - cropLeft, 500), height: Math.min(bigMeta.height, HEIGHT) })
  .toBuffer();
const photoMeta = await sharp(photo).metadata();

// Warm honey background with gradient
const background = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F5EDD6"/>
        <stop offset="40%" style="stop-color:#E8DFC8"/>
        <stop offset="100%" style="stop-color:#DDD3B8"/>
      </linearGradient>
      <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.8)">
        <polygon points="30,2 55,15 55,37 30,50 5,37 5,15"
          fill="none" stroke="rgba(180,140,60,0.10)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect width="100%" height="100%" fill="url(#hex)"/>
  </svg>
`;

// Dark panel on the left for text contrast
const leftPanel = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgba(62,39,35,0.97)"/>
        <stop offset="55%" style="stop-color:rgba(62,39,35,0.95)"/>
        <stop offset="80%" style="stop-color:rgba(62,39,35,0.7)"/>
        <stop offset="100%" style="stop-color:rgba(62,39,35,0)"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="820" height="${HEIGHT}" fill="url(#panel)"/>
  </svg>
`;

// Text overlay
const textOverlay = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Top honey accent bar -->
    <rect x="0" y="0" width="${WIDTH}" height="5" fill="#FFC107"/>
    <rect x="0" y="${HEIGHT - 5}" width="${WIDTH}" height="5" fill="#FFC107"/>

    <!-- Left accent bar (aligned with name) -->
    <rect x="56" y="160" width="4" height="120" rx="2" fill="#FFC107"/>

    <!-- SmartBee brand -->
    <text x="72" y="95" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-size="26" font-weight="800" fill="#FFC107" letter-spacing="3">
      SMARTBEE
    </text>

    <!-- Decorative dot -->
    <circle cx="260" cy="88" r="5" fill="#FFC107"/>

    <!-- Name -->
    <text x="72" y="200" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-size="54" font-weight="700" fill="#FFFFFF">
      Anastasia
    </text>
    <text x="72" y="268" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-size="54" font-weight="700" fill="#FFFFFF">
      Hnylytska
    </text>

    <!-- Role with warm honey color -->
    <text x="72" y="330" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-size="24" font-weight="600" fill="#FFD54F" letter-spacing="1">
      DevOps / Platform Engineer
    </text>

    <!-- Tech stack pills with warm backgrounds -->
    <g transform="translate(72, 375)">
      <rect x="0" y="0" width="100" height="34" rx="17" fill="rgba(255,193,7,0.25)" stroke="#FFC107" stroke-width="1.5"/>
      <text x="50" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFC107" text-anchor="middle">Terraform</text>

      <rect x="114" y="0" width="66" height="34" rx="17" fill="rgba(255,193,7,0.25)" stroke="#FFC107" stroke-width="1.5"/>
      <text x="147" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFC107" text-anchor="middle">GCP</text>

      <rect x="194" y="0" width="74" height="34" rx="17" fill="rgba(255,193,7,0.25)" stroke="#FFC107" stroke-width="1.5"/>
      <text x="231" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFC107" text-anchor="middle">Azure</text>

      <rect x="282" y="0" width="60" height="34" rx="17" fill="rgba(255,193,7,0.25)" stroke="#FFC107" stroke-width="1.5"/>
      <text x="312" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFC107" text-anchor="middle">K8s</text>

      <rect x="356" y="0" width="78" height="34" rx="17" fill="rgba(255,193,7,0.25)" stroke="#FFC107" stroke-width="1.5"/>
      <text x="395" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFC107" text-anchor="middle">CI/CD</text>

      <rect x="448" y="0" width="82" height="34" rx="17" fill="rgba(255,193,7,0.25)" stroke="#FFC107" stroke-width="1.5"/>
      <text x="489" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFC107" text-anchor="middle">Docker</text>
    </g>

    <!-- Website URL -->
    <text x="72" y="${HEIGHT - 35}" font-family="'Segoe UI', Arial, sans-serif"
      font-size="16" font-weight="600" fill="rgba(255,255,255,0.6)" letter-spacing="1">
      smartbee.me
    </text>
  </svg>
`;

// Photo position: right side, vertically centered, bottom-aligned
const photoX = WIDTH - photoMeta.width - 60;
const photoY = HEIGHT - photoMeta.height;

// Create gradient mask for photo (fade left edge into the dark panel)
const maskWidth = photoMeta.width;
const maskHeight = photoMeta.height;
const photoMask = `
  <svg width="${maskWidth}" height="${maskHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0%" y1="0%" x2="25%" y2="0%">
        <stop offset="0%" style="stop-color:black; stop-opacity:0"/>
        <stop offset="100%" style="stop-color:black; stop-opacity:1"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#fade)"/>
  </svg>
`;

// Apply mask to photo
const maskedPhoto = await sharp(photo)
  .ensureAlpha()
  .composite([{
    input: Buffer.from(photoMask),
    blend: "dest-in",
  }])
  .toBuffer();

// Compose final image
await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: { r: 245, g: 237, b: 214, alpha: 255 }, // #F5EDD6 muted cream
  },
})
  .composite([
    { input: Buffer.from(background), top: 0, left: 0 },
    { input: maskedPhoto, top: photoY, left: photoX },
    { input: Buffer.from(leftPanel), top: 0, left: 0 },
    { input: Buffer.from(textOverlay), top: 0, left: 0 },
  ])
  .png({ quality: 90 })
  .toFile(resolve(root, "public/og-image.png"));

console.log("OG image generated: public/og-image.png (1200x630)");
