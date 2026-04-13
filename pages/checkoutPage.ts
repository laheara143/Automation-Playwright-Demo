import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async goToCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }  

    async fillCheckoutInfo(fName: string, lName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(fName);
        await this.page.locator('[data-test="lastName"]').fill(lName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
    }

    async verifyOverviewPage() {
    await expect (this.page).toHaveURL(/checkout-step-two.html/);
    await expect (this.page.locator('[data-test="inventory-item-name"]')).toHaveCount(2);
    await expect (this.page.locator('[data-test="total-label"]')).toBeVisible();

    }
    
    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();

    }  
    
    async verifyCompletionPage() {
        await expect (this.page).toHaveURL(/checkout-complete.html/);
        await expect (this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    }    
}