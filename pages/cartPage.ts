import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async verifyItemInCart(itemName: string) {
        await expect (this.page.locator('.inventory_item_name')).toContainText(itemName);
    }

    async removeItem(itemName: string) {
        await this.page.locator(`.cart_item:has-text("${itemName}") button`).click();
    }  

    async verifyCartEmpty() {
        await expect (this.page.locator('.cart_item')).toHaveCount(0);
    }  
    
}