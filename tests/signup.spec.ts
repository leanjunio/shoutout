import { test, expect } from "@playwright/test";

test("should be able to signup successfully", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByText("Signup")).toBeVisible();

    const username = page.getByRole("textbox", { name: /username/i });
    await expect(username).toBeVisible();
    await page
        .locator('input[name="username"]')
        .pressSequentially("john.doe11");

    await page.locator('input[name="password"]').pressSequentially("password1");
    await page.locator('button[type="submit"]').click();

    const first = page.getByText(/successfully signed up/i).first();
    await expect(first).toBeVisible();
});
