// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/station01')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Railway React 3");
});

test('サインイン 名前なし', async ({ page }) => {
  await page.goto('http://localhost:5173/station01')
  await page.locator('input[type="email"]').fill('');
  await page.locator('input[type="password"]').fill('pass');
  await page.getByRole('button', { name: 'サインイン' }).click();
  await expect(page.getByText('サインインに失敗しました。')).toBeVisible();
});

test('サインイン パスなし', async ({ page }) => {
  await page.goto('http://localhost:5173/station01')
  await page.locator('input[type="email"]').fill('name');
  await page.locator('input[type="password"]').fill('');
  await page.getByRole('button', { name: 'サインイン' }).click();
  await expect(page.getByText('サインインに失敗しました。')).toBeVisible();
});

test('サインイン 正常', async ({ page }) => {
  await page.goto('http://localhost:5173/station01')
  await page.locator('input[type="email"]').fill('name');
  await page.locator('input[type="password"]').fill('pass');
  await page.getByRole('button', { name: 'サインイン' }).click();
  await expect(page.getByText('サインインに成功しました。')).toBeVisible();
});
