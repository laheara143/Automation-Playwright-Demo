import {test , expect } from '@playwright/test';

test.describe('Demo Script', () => {

test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
});

test('Navigate to page, Log In, Add Items, Checkout', async ({page}) => {

    const response = await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]' , 'standard_user');
    await page.fill('[data-test="password"]' , 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await page.waitForLoadState();
    expect(response?.status()).toBe(200);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect (page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await page.click('#shopping_cart_container');

    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]' , 'Test');
    await page.fill('[data-test="lastName"]' , '1');
    await page.fill('[data-test="postalCode"]' , '12345');
    await page.click('[data-test="continue"]');

    await expect (page).toHaveURL(/checkout-step-two.html/);
    await expect (page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect (page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');

    await page.click('[data-test="finish"]');
    await expect (page).toHaveURL(/checkout-complete.html/);


});

});