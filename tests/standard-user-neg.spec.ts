import {test, expect } from '@playwright/test';

test.describe('Standard User can remove added items and the cart badge will reflect that', () => {

test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
});

test('Navigate to page, Log In, Add Items, Remove Items and verify Cart Badge', async ({page}) => {

    //Navigate to site and login
    const response = await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]' , 'standard_user');
    await page.fill('[data-test="password"]' , 'secret_sauce');
    await page.click('[data-test="login-button"]');

    //Wait for page to fully load and verify response
    await page.waitForLoadState();
    expect(response?.status()).toBe(200);

    //Add items to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    //Verify cart badge is updated
    await expect (page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    //Go to cart
    await page.click('#shopping_cart_container');

    //Remove all items
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await page.click('[data-test="remove-sauce-labs-bike-light"]');

    //Verify cart badge is updated
    await expect(page.getByTestId('[data-test="shopping-cart-badge"]')).toBeHidden();

    //Screenshot to verify Test Results
    await page.screenshot({ path: 'screenshots/removed-items.png' });


});

});
