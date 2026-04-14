import {test , expect} from '@playwright/test' ;

test.describe('Locked Out User cannot sign in and recieves an error message', () => {

    test.beforeEach(async ({page}) =>{

        await page.goto('https://www.saucedemo.com/');
    });

    test('Attempt to log in and verify error message ', async ({page}) => {

        //Verify reponse of site
        const response = await page.goto('https://www.saucedemo.com/');
        expect(response?.status()).toBe(200);

        //Fill in log in information and click 'Login'
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        //Verify Unsuccesful Login
        await expect (page).toHaveURL(/www.saucedemo.com/);

        //Verify Error Message
        await expect (page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        //Screenshot to verify Test Results
        await page.screenshot({ path: 'screenshots/after-login-attempt.png' });
    });


});