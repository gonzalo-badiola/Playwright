import { test, expect } from "@playwright/test";

const textoAEscribir = 'Estoy aprendiendo playwright';

test.setTimeout(150000);

test.describe('Acciones en el automation Sandbox', () => {

  test('Click en Boton ID Dinamico', async ({ page }) => {
    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    const botonIDDinamico = page.getByRole('button', {
      name: 'Hare click para genar un ID dinamico y mostrar el elemento oculto'
    });

    await botonIDDinamico.click({force: true});
  });

  test('Lleno un campo de texto en automation sandbox', async ({ page }) => {
    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

    await page
      .getByRole('textbox', { name: 'Un aburrido texto' })
      .fill(textoAEscribir);
  });

});

