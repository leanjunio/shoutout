import { test, expect } from "@playwright/test";

test("should be able to login successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await expect(page.getByText("Login")).toBeVisible();

    const USERNAME = "john.doe11";

    const username = page.getByRole("textbox", { name: /username/i });
    await expect(username).toBeVisible();
    await page.locator('input[name="username"]').pressSequentially(USERNAME);

    await page.locator('input[name="password"]').pressSequentially("password1");
    await page.locator('button[type="submit"]').click();

    const first = page.getByText(`Welcome ${USERNAME}`).first();
    await expect(first).toBeVisible();
});

test("should not be able to login with invalid credentials", async ({
    page,
}) => {
    await page.goto("http://localhost:3000/login");
    await expect(page.getByText("Login")).toBeVisible();

    const USERNAME = "john.doe11";

    const username = page.getByRole("textbox", { name: /username/i });
    await expect(username).toBeVisible();
    await page.locator('input[name="username"]').pressSequentially(USERNAME);

    const WRONG_PASSWORD = "password123";
    await page
        .locator('input[name="password"]')
        .pressSequentially(WRONG_PASSWORD);
    await page.locator('button[type="submit"]').click();

    const error = page.getByText(/invalid credentials/i).first();
    await expect(error).toBeVisible();
});
