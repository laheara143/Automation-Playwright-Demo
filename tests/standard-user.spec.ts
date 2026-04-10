import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

test.describe('Standard User can add items and complete checkout', () => {

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Navigate to page, Log In, Add Items, Checkout', async ({page}) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    //Verifying Page status
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    //Wait for page to fully load and verify response
    await page.waitForLoadState();
    
    //Add items to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');

    //Go to cart
    await inventoryPage.goToCart();

    //Verify cart badge is updated
    await cartPage.verifyCartAmount(2);

    //Go to Checkout
    await page.click('[data-test="checkout"]');

    //Fill in Checkout Information
    await page.fill('[data-test="firstName"]' , 'Test');
    await page.fill('[data-test="lastName"]' , '1');
    await page.fill('[data-test="postalCode"]' , '12345');

    //Go to overview page and verify price
    await page.click('[data-test="continue"]');
    await expect (page).toHaveURL(/checkout-step-two.html/);
    await expect (page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect (page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');

    //Confirm order and verify completion page
    await page.click('[data-test="finish"]');
    await expect (page).toHaveURL(/checkout-complete.html/);

    //Screenshot to verify Test Results
    await page.screenshot({ path: 'screenshots/order-completion-page.png' });


});

});