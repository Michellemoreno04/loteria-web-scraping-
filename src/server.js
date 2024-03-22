import puppeteer from "puppeteer";
import express from "express"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());




  // Ruta para obtener los datos
app.get('/datos',(req, res) => {
    res.json(resultadoDatosDinamicos)
   });

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});


async function openBrowser(){
    // puppeteer.lauch es para inicializae puppeteer
      const browser = await puppeteer.launch({
        //para que habra una ventana y ver que esta haciendo (lo contrario ponemos "headless:new")
        headless: false,
        slowMo: 2000
      })
                    //newPage es para abrir otra pagina o instancia
    const page = await browser.newPage()
    // goto() es para ir a la url a trabajar
    await page.goto("https://example.com/")
    
    await browser.close()
    
    }
    //openBrowser()

    async function capturaPantalla(){
        // puppeteer.lauch es para inicializae puppeteer
          const browser = await puppeteer.launch({
            //para que habra una ventana y ver que esta haciendo (lo contrario ponemos "headless:new")
            headless:false,
            slowMo: 3000
          })
                        //newPage es para abrir otra pagina o instancia
        const page = await browser.newPage()
        // goto() es para ir a la url a trabajar
        await page.goto("https://www.conectate.com.do/loterias/")
        //De la siguente forma se tomara un screenshop a la web
        await page.screenshot({path: "captura.png"})
        await browser.close()
        
        }
//capturaPantalla()

async function click(){
    // puppeteer.lauch es para inicializae puppeteer
      const browser = await puppeteer.launch({
        //para que habra una ventana y ver que esta haciendo (lo contrario ponemos "headless:new")
        headless:false,
        //slowmo es para alentar el proceso en cada cambio
        slowMo: 3000
      })
                    //newPage es para abrir otra pagina o instancia
    const page = await browser.newPage()
    // goto() es para ir a la url a trabajar
    await page.goto("https://quotes.toscrape.com/")
    //De la siguente forma se hace click en una etiqueta            
    await page.click('a[href="/login"]')
    //de la siguiente forma se pone un tiempo de espera 
    await new Promise (r=> setTimeout(r,3000))
    await browser.close()
    
    }
    //click()

    async function getData(){
        // puppeteer.lauch es para inicializae puppeteer
          const browser = await puppeteer.launch({
            //para que habra una ventana y ver que esta haciendo (lo contrario ponemos "headless:new")
            headless:false,
            //slowmo es para alentar el proceso en cada cambio
            slowMo: 3000
          })
                        //newPage es para abrir otra pagina o instancia
        const page = await browser.newPage()
        // goto() es para ir a la url a trabajar
        await page.goto("https://www.conectate.com.do/loterias/")
        // DE LA SIGUIENTE FORMA SE PUEDO EJECUTAR CODIGO DENTRO DE LA WEB 
        const resultado = await page.evaluate(()=>{
        const titulo = document.querySelector("h1").innerHTML
        // se debe hacerse con un return para que retorne lo encontrado
        return{
            titulo 
        }
        })
        console.log(resultado)
        //de la siguiente forma se pone un tiempo de espera 
        await new Promise (r=> setTimeout(r,3000))
        await browser.close()
    }
//getData()
let resultadoDatosDinamicos; // Variable para almacenar el resultado fuera de la función

async function datosDinamicos(){
    // puppeteer.lauch es para inicializae puppeteer
      const browser = await puppeteer.launch({
        //para que habra una ventana y ver que esta haciendo (lo contrario ponemos "headless:new")
        headless:true,
        //slowmo es para alentar el proceso en cada cambio
        //slowMo: 3000
      })
                    //newPage es para abrir otra pagina o instancia
    const page = await browser.newPage()
    // goto() es para ir a la url a trabajar
    await page.goto("https://www.conectate.com.do/loterias/")
       // Esperar hasta que un número de lotería esté presente en el DOM
       await page.waitForSelector('.row.content-block');
    // DE LA SIGUIENTE FORMA SE PUEDO EJECUTAR CODIGO DENTRO DE LA WEB 
    const resultado = await page.evaluate(()=>{
        //Array.from se utiliza para convertir este objeto en un array estándar de JavaScript.
    const numeros = Array.from(document.querySelectorAll(".game-scores.ball-mode"))// esta es la clase de los contenedores de los numeros 
    
    
    // se debe hacerse con un return para que retorne lo encontrado
return numeros.map(num => num.innerText)// este es el array


    })
    //console.log("este es el resultado: ",resultado)// si aqui pongo [] puedo elejir que numeros usar
    await browser.close()
    resultadoDatosDinamicos = resultado //esto es para sacar el resultado de la funcion
   
}
// Llamar a la función y esperar que se complete
datosDinamicos().then(() => {
  console.log("Datos dinámicos recibidos:", resultadoDatosDinamicos);
}).catch(error => {
  console.error("Error al obtener los datos dinámicos:", error);
});

// Función para ejecutar el scraping cada hora
async function reScraping() {
  await datosDinamicos;
  setInterval(datosDinamicos, 60 * 60 * 1000); // 60 minutos * 60 segundos * 1000 milisegundos = 1 hora
}

// Ejecutar el script
reScraping();

