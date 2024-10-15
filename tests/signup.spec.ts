import { test, expect } from "@playwright/test";

test('should be able to signup successfully', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByText('Signup')).toBeVisible()
    await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible()
    await page.locator('input[name="username"]').pressSequentially('john.doe11')
    await page.locator('input[name="password"]').pressSequentially('password1')
    await page.locator('button[type="submit"]').click()

    await expect(page.getByText(/successfully signed up/i)).toBeVisible()
})
