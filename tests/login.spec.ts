import { test, expect } from "@playwright/test";

test("should be able to login successfully", async ({ page, context }) => {
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

    const cookies = await context.cookies();
    await expect(cookies.find((c) => c.name === "token")).toBeTruthy();

    await page.waitForURL(/dashboard/);
    await expect(page.getByText("Dashboard")).toBeVisible();
});
