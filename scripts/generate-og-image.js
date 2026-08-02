import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const generateOGImage = async (title, outputPath) => {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a202c" />
      <text x="50" y="200" font-family="Arial" font-size="48" fill="#ffffff" font-weight="bold">
        ${title}
      </text>
      <text x="50" y="550" font-family="Arial" font-size="24" fill="#a0aec0">
        Insurancesupport.online
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  console.log(`OG Image generated at: ${outputPath}`);
};

const blogTitle = "Insurance Claim Rejection Rates in India 2026: Complete Data by Insurer";
const outputPath = path.join('D:', 'insurancesupport-astro', 'public', 'og-insurance-claim-rejection-rates.png');

generateOGImage(blogTitle, outputPath).catch(console.error);
