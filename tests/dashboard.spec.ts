import { test } from "@playwright/test";

test("should be able to login successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard");
});
