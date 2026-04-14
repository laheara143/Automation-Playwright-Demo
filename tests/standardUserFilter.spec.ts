import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Standard User can sort products using the filter', () => {

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Navigate to page, Log In, Adjust Filter', async ({page}) => {
 
    const inventoryPage = new InventoryPage(page);

    //Wait for page to fully load
    await page.waitForLoadState();

    //Adjust filter
    await inventoryPage.applyFilter('lohi');

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
