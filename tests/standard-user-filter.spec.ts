import {test, expect } from '@playwright/test';

test.describe('Standard User can sort products using the filter', () => {

test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
});

test('Navigate to page, Log In, Adjust Filter', async ({page}) => {

    //Navigate to site and login
    const response = await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]' , 'standard_user');
    await page.fill('[data-test="password"]' , 'secret_sauce');
    await page.click('[data-test="login-button"]');

    //Wait for page to fully load and verify response
    await page.waitForLoadState();
    expect(response?.status()).toBe(200);

    //Adjust filter
    const store_cart_dropdown = page.locator('[data-test="product-sort-container"]');
    store_cart_dropdown.selectOption("Price (low to high)");

    //Verify store filter was changed to Low to High
    await page.screenshot({ path: 'screenshots/store-filter.png' });

    //Verify product order has changed
    const products = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericproducts = products.map(p => parseFloat(p.replace('$', '')));

    //Verify Low to High
    const sorted = [...numericproducts].sort((a, b) => a - b);
    expect(numericproducts).toEqual(sorted);

    //Screenshot to verify Test Results
    await page.screenshot({ path: 'screenshots/filter-low-to-high--page.png' });


});

});
