import { test, expect } from "@playwright/test";
import { error } from "console";

const textoAEscribir = "Estoy aprendiendo playwright";

test.setTimeout(200000);

test.describe("Acciones en el automation Sandbox", () => {
  test("Click en Boton ID Dinamico", async ({ page }) => {
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );

    const botonIDDinamico = page.locator("button:has-text('ID')");
    await botonIDDinamico.click();
    await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
  });

  test("Lleno un campo de texto en automation sandbox", async ({ page }) => {
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );
    await test.step('Puedo ingresar texto en el campo de texto' , async () => {
      await expect(page.getByRole("textbox", { name: "Un aburrido texto" }), 'El campo de texto no admite edicion').toBeEditable();
      await page.getByRole("textbox", { name: "Un aburrido texto" }).fill(textoAEscribir);
      expect(page.getByRole("textbox", { name: "Un aburrido texto" }), 'El campo de texto no admite edicion').toHaveValue(textoAEscribir);
      //expect(page.getByRole("textbox", { name: "Un aburrido texto" }), 'El campo de texto no admite edicion').toHaveText(textoAEscribir);
    })
    
  });
  test("Puedo seleccionar checkboxes", async ({ page }) => {
    await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("Puedo seleccionar y deseleccionar un checkbox para pasta", async () => {
      await page.getByRole("checkbox", { name: "Pasta 🍝" }).check();
      await page.getByRole("checkbox", { name: "Pasta 🍝" }).uncheck();
      await expect(page.getByRole("checkbox", { name: "Pasta 🍝" })).not.toBeChecked();
    });
  });

  test("Puedo seleccionar Radio Button", async ({ page }) => {
    await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("Puedo seleccionar el checkbox para no", async () => {
      await page.getByRole("radio", { name: "No" }).check();
      await expect(page.getByRole("radio", { name: "No" })).toBeChecked();
    });
  });
  test("Puedo seleccionar un Dropdown", async ({ page }) => {
    await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("selecciono un deporte del Dropdawn", async () => {
      await page.getByLabel("Dropdown").selectOption("Fútbol");

      await test.step('valido que el dropdown tenga los valores requeridos', async () => {
        const deportes = ['Fútbol', 'Tennis', 'Basketball']

        for(let opcion of deportes){
          const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
          if (elemento){
            console.log(`El Deporte ${opcion} esta en la lista`);
          }else {  
            throw new Error(`Deporte ${opcion} no presente en la lista`)
          }

        }
      })

    });
  });
 
  test ("Valido los nombres de la tabla estatica", async ({page}) => {
await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/");
    });
    await test.step("puedo validar los elementos de la tabla estatica ", async () => {
      const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', element => element.map(element => element.textContent));

      const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

      expect(valoresColumnaNombres).toEqual(nombresEsperados);
    })
  } )

  test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
 
                //Hacemos una recarga para que cambien los valores
                await page.reload();
 
                //Creamos un segundo arreglo con los valores luego de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
 
                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
 
            })
 
 
        })

  test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
 
        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
 
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
 
            })
 
 
        })


  test("Puedo seleccionar un Dropdown de los dias", async ({ page }) => {
    await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("Selecciono un dia de la semana del Dropdawn", async () => {
      await page.getByRole("button", { name: "Día de la semana" }).click();
      await page.getByRole("link", { name: "Martes" }).click();
    });
  });

  // test("Puedo subir archivos a Automation Sandbox", async ({ page }) => {
  //   await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
  //     await page.goto(
  //       "https://thefreerangetester.github.io/sandbox-automation-testing/"
  //     );
  //   });

  //   await test.step("Agregue archivos para ser subidos", async () => {
  //     await page.getByLabel('Upload file').setInputFiles('pathAlArchivo.pdf')
  //     await page.getByLabel('Upload file').setInputFiles([]) // para borrar el archivo
  //   });
  // })

  // test("Puedo hacer drap and drop de elementos en Automation Sandbox", async ({ page }) => {
  //   await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
  //     await page.goto(
  //       "https://thefreerangetester.github.io/sandbox-automation-testing/"
  //     );
  //   });

  //   await test.step("Agregue archivos para ser subidos", async () => {
  //     await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'))
  //   });
  // })


})
