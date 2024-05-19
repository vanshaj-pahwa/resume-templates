const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function generatePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load local HTML file
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlContent = await fs.readFile(htmlPath, 'utf8');

    // Set HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    await page.pdf({
        path: 'LinkedIn_Resume.pdf',
        format: 'A4',
        printBackground: true
    });

    await browser.close();
}

generatePDF().catch(console.error);
