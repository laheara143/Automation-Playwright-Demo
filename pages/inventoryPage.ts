import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) {}

    async addItemToCart(item: string) {
        await this.page.locator('[data-test="add-to-cart-${item}"]').click();
    }

    async removeItem(item: string) {
        await this.page.locator('[data-test="remove-${item}"]').click();
    }  

    async goToCart() {
        await this.page.locator('#shopping_cart_container').click();
    }    

    async applyFilter(value: string) {
        await this.page.selectOption('.product-sort-container', value);
    }    

}