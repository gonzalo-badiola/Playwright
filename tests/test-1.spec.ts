import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.getByRole('link', { name: 'Cursos', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '¿Qué curso me conviene?' }).click();
  const page1 = await page1Promise;
});