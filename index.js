import puppeteer from "puppeteer";
import fs from "fs/promises";

async function openWebPage() {


    //abrir navegador

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();

    await page.goto('https://example.com');

    await browser.close()
}

//openWebPage();

async function screenShot() {


    //abrir navegador

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();

    await page.goto('https://redpackage.app');
    await page.screenshot({path: 'example.png'})

    await browser.close()
}

//screenShot();

async function makeClick() {


    //abrir navegador

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com/');
    await page.click('a[href="/login"]')
    await new Promise(r => setTimeout(r, 5000));
    await browser.close()
}

//makeClick();

async function catchWebInfo() {
    // Abrir navegador
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();

    // Navegar a la página
    await page.goto('https://quotes.toscrape.com/');

    // Evaluar el contenido en la página y capturar el texto deseado
    const headingText = await page.evaluate(() => {
        const title_1 = document.querySelector('h1').innerText;
        const title_2 = document.querySelector('h2').innerText;
        const a = document.querySelector('a.tag').innerText;

        return {
            title_1,
            title_2,
            a
        }
    });

    // Imprimir el resultado en la consola
    console.log('Heading Text:', headingText);

    // Cerrar el navegador
    await browser.close();
}

// Ejecutar la función
//catchWebInfo();

async function handleDynamicWebPage() {
    // Abrir navegador
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();

    // Navegar a la página
    await page.goto('https://quotes.toscrape.com/');

    // Evaluar el contenido en la página y capturar el texto deseado
    const result = await page.evaluate(() => {
        const quotes = document.querySelectorAll('.quote');
        const data = [...quotes].map(quote => {
            const quotetext = quote.querySelector('.text').innerText;
            const author = quote.querySelector('.author').innerText;
            const tags = [...quote.querySelectorAll('.tag')].map(tag => tag.innerText);
            return {
                quotetext,
                author,
                tags
            }
        });
        return data
    });

    // Imprimir el resultado en la consola
    console.log(result);
    await fs.writeFile('quotes.json', JSON.stringify(result, null, 2));
    // Cerrar el navegador
    await browser.close();
}

handleDynamicWebPage();