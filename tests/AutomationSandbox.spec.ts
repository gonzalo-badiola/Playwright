import { test, expect } from "@playwright/test";

const textoAEscribir = "Estoy aprendiendo playwright";

test.setTimeout(200000);

test.describe("Acciones en el automation Sandbox", () => {
  test("Click en Boton ID Dinamico", async ({ page }) => {
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );

    const botonIDDinamico = page.locator("button:has-text('ID')");
await botonIDDinamico.click();

  });

  test("Lleno un campo de texto en automation sandbox", async ({ page }) => {
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );

    await page
      .getByRole("textbox", { name: "Un aburrido texto" })
      .fill(textoAEscribir);
    await page
      .getByRole("textbox", { name: "Un aburrido texto" })
      .press("Enter");
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
    });
  });
  test("Puedo seleccionar un Dropdown", async ({ page }) => {
    await test.step("Dado que navego al navegador de Free Range Testers ", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("slecciono un deporte del Dropdawn", async () => {
      await page.getByLabel("Dropdown").selectOption("Fútbol");
    });
  });

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
