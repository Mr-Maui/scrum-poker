import { expect, test } from '@playwright/test';

test('home and preview clearly disable room actions', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Scrumation.com/);
  await expect(
    page.getByRole('button', { name: 'Create a room' }),
  ).toBeDisabled();
  await page.getByRole('link', { name: 'Explore the room layout' }).click();
  await expect(page).toHaveURL('/rooms/preview');
  await expect(
    page.getByText('Explore the layout. This preview is not a live room.'),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Reveal estimates' }),
  ).toBeDisabled();
  await expect(
    page.getByRole('button', { name: 'Estimate 5', exact: true }),
  ).toBeDisabled();
  const width = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(width.page).toBeLessThanOrEqual(width.viewport);
});

test('direct room URLs and keyboard navigation work', async ({ page }) => {
  await page.goto('/rooms/not-a-live-room');
  await expect(
    page.getByRole('heading', { name: 'Room service unavailable' }),
  ).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Scrumation.com home' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Create a room' }),
  ).toBeVisible();
});
