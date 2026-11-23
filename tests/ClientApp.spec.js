const {test, expect} = require ('@playwright/test');


test("Login and get first title", async({page})=> {

    const productName= "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".form-control").nth(0).fill("samikshamankar6014@gmail.copm");
    await page.locator(".form-control").nth(1).fill("Samiksha@1204");
    await page.locator(".btn-block").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor(); //after loding the images we had to wait until one card is loaded otherwise it might fail
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count =await products.count();
    for(let i =0; i<count; ++i)
        {
        if(await products.nth(i).locator("b").textContent()=== productName){
            
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
            
            await page.locator("[routerlink*='cart']").click();
            await page.locator('div li').first().waitFor();
            const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
            expect(bool).toBeTruthy();
            await page.locator("text= Checkout").click();
            await page.pause();
            await page.locator(".input[type='text']").nth(0).fill("5656454534348787");
            await page.locator(".input[type='text']").nth(1).fill("123");
            await page.locator(".input[type='text']").nth(2).fill("Samiksha Mankar");
            await page.locator(".input[type='text']").nth(3).fill("SAM10");
            await page.locator("[Placeholder='Select Country']").pressSequentially("ind");
            
            const options = page.locator("ta-results");
            await options.waitFor();
            const countoptions= await options.locator("button").count();

            for(let i= 0; i<countoptions; ++i){
                const text = await dropdown.locator("button").nth(i).textContent();
                if(text=== "India"){
                    await dropdown.locator("button").nth(i).click();
                    break;
                }

                await page.pause();
            }

            
        

});
