import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

test.describe('Standard User can remove added items and the cart badge will reflect that', () => {

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Navigate to page, Log In, Add Items, Remove Items and verify Cart Badge', async ({page}) => {
   
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    //Wait for page to fully load
    await page.waitForLoadState();

    //Add items to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');

    //Go to cart
    await inventoryPage.goToCart();

    //Verify cart badge is updated
    await cartPage.verifyCartAmount(2);

    //Verify Items In Cart
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.verifyItemInCart('Sauce Labs Bike Light');


    //Remove all items
    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.removeItem('Sauce Labs Bike Light');

    //Verify cart badge is updated
    await cartPage.verifyCartEmpty();

    //Screenshot to verify Test Results
    await page.screenshot({ path: 'screenshots/verifyRemovedItems.png' });


});

});
