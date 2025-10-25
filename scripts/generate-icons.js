// Simple icon generator for PWA icons
// This creates basic SVG icons that can be converted to PNG

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

const createIconSVG = (size: number) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.15}" fill="white" fill-opacity="0.1"/>
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <rect x="0" y="${size * 0.1}" width="${size * 0.5}" height="${size * 0.3}" rx="${size * 0.05}" fill="white"/>
    <rect x="${size * 0.1}" y="${size * 0.2}" width="${size * 0.3}" height="${size * 0.1}" rx="${size * 0.02}" fill="#2563eb"/>
    <circle cx="${size * 0.15}" cy="${size * 0.35}" r="${size * 0.08}" fill="white"/>
    <circle cx="${size * 0.35}" cy="${size * 0.35}" r="${size * 0.08}" fill="white"/>
    <rect x="${size * 0.05}" y="${size * 0.5}" width="${size * 0.4}" height="${size * 0.15}" rx="${size * 0.02}" fill="white"/>
    <rect x="${size * 0.1}" y="${size * 0.52}" width="${size * 0.3}" height="${size * 0.11}" rx="${size * 0.01}" fill="#2563eb"/>
  </g>
</svg>`;

// Create icons directory and generate SVG files
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

iconSizes.forEach(size => {
  const svgContent = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svgContent);
  console.log(`Created ${filename}`);
});

console.log('PWA icons generated successfully!');
console.log('Note: You may want to convert these SVG files to PNG for better browser compatibility.');
