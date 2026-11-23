const {test, expect} = require ('@playwright/test');
const { sign } = require('node:crypto');
 
test('Bowser context declaration test cases', async ({browser})=> {

    // chrome - plugins/ cookies
    const context= await browser.newContext();
    const page = await context.newPage(); 

    const userName= page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitle= page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
     await userName.fill("rahulshetty");
     await page.locator("[name= 'password']").fill('Learning@830$3mK2');
     await signIn.click();
     console.log(await page.locator("[style*='block']").textContent());

     await expect(page.locator("[style*='block']")).toContainText('Incorrect');
     await userName.fill("");
     await userName.fill("rahulshettyacademy");
     await signIn.click();
    //  console.log(await cardTitle.nth(0).textContent());
     console.log(await cardTitle.nth(1).textContent());

     const allTites= await cardTitle.allTextContents();
     console.log(allTites);
     await page.pause();
});

test('UI basics', async ({page})=>{
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropdownOption=  page.locator("select.form-control");
    const userName= page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    await userName.fill("rahulshettyacademy");
    await page.locator("[name= 'password']").fill('Learning@830$3mK2');
    await dropdownOption.selectOption("consult");
    // await signIn.click();
    await page.locator(".radiotextsty").nth(1).click();
    await page.getByRole('button', { name: 'Okay' }).click();
    // await page.locator("#okayBtn").click();
    // await page.pause();
    await page.locator(".radiotextsty").last().isChecked();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test('Child window handle', async ({browser})=> {
    const context= await browser.newContext();
    const page = await context.newPage(); 
    const userName= page.locator('#username');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    const text= await newPage.locator('.red').textContent();
    const arrText= text.split("@");
    const domain=  arrText[1].split(" ")[0];
    // console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

});