// # Javascript
// ## Đề bài:
// Số nguyên tố là một số tự nhiên lớn hơn 1 và chỉ chia hết cho 1 và chính nó. Trong bài tập này, bạn sẽ viết một hàm để kiểm tra xem một số có phải là số nguyên tố hay không.

// Một số nguyên tố là số chỉ có đúng hai ước là 1 và chính nó. Để kiểm tra một số n có phải số nguyên tố hay không, bạn cần kiểm tra xem n có chia hết cho bất kỳ số nào từ 2 đến căn bậc hai của n không. Nếu có, nó không phải số nguyên tố

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `isPrime` để kiểm tra xem một số có phải là số nguyên tố không.
// - Nếu số là số nguyên tố, in ra "Số này là số nguyên tố". Nếu không phải, in ra "Số này không phải là số nguyên tố".

// ## Ví dụ:

// **Input**: 
// - Số: `7`

// **Output**: 
// - Kết quả: `"Số này là số nguyên tố"`

// **Giải thích**: 
// Số `7` chỉ chia hết cho `1` và `7`, do đó nó là số nguyên tố.

// ## Ví dụ khác:

// **Input**: 
// - Số: `10`

// **Output**: 
// - Kết quả: `"Số này không phải là số nguyên tố"`

// **Giải thích**: 
// Số `10` chia hết cho `1`, `2`, `5`, và `10`, do đó nó không phải là số nguyên tố.

// ### Gợi ý:
// Bạn có thể sử dụng vòng lặp để kiểm tra số đó có chia hết cho bất kỳ số nào từ 2 đến căn bậc hai của số đó hay không. Nếu có, thì đó không phải là số nguyên tố.

function isPrime(num) {
    var flag = true;
    if (!Number.isInteger(num) && num <= 0) flag = false;
    if(num > 3){
        for(var i = 2; i <= Math.sqrt(num); i++){
            if(num % i === 0){
                flag = false; break;
            }
        }
    }
    return flag;
}

var number = 1119
if(!isPrime(number)){
    console.log(`Số đầu vào: ${number}. Số này không phải là số nguyên tố`)
}else {
    console.log(`Số đầu vào: ${number}. Số này là số nguyên tố`);
}

// # Playwright
// ## Đề bài
// Viết code automation cho test case sau:
// - Đi tới trang: https://material.playwrightvn.com/
// - Click vào: Bài học 2: Product page
// - Thêm vào giỏ hàng 2 sản phẩm 1.
// - Thêm vào giỏ hàng 2 sản phẩm 2.
// - Thêm vào giỏ hàng 3 sản phẩm 3.

// - Kiểm số lượng sản phẩm đúng.
// - (Nâng cao) Kiểm tra tổng tiền sản phẩm đúng (tổng tiền = tổng (số lượng * đơn giá))

const {test, expect} = require('@playwright/test');
const { log } = require('console');
const pageMaterial = 'https://material.playwrightvn.com/';
const products = [
    {
        id: 1,
        productName: 'Product 1',
        price: 10.00,
        numPurchase: 2
    },
    {
        id: 2,
        productName: 'Product 2',
        price: 20.00,
        numPurchase: 3
    },
    {
        id: 3,
        productName: 'Product 3',
        price: 30.00,
        numPurchase: 4
    }
];

test('Challenge 17-09-2024', async ({ page }) => {
    await test.step('Go to page material', async () => {
        await page.goto(pageMaterial);
    })
    await test.step('Click session 2: Product Page', async () => {
        await page.locator("//a[contains(text(),'Bài học 2: Product page')]").click();
    })
    await test.step('Add products to card', async () => {
        for (let i = 0; i < products.length; i++) {
            await page.locator("//button[@data-product-id='" + products[i].id + "']").click({ clickCount: products[i].numPurchase });
        }
    })
    await test.step('Check total amount need to pay', async () => {
        let totalAmount = 0;
        for (let i = 0; i < products.length; i++) {
            totalAmount = totalAmount + products[i].price * products[i].numPurchase;

        }
        //Check tổng số loại sản phẩm được add vào giỏ hàng
        const numRow = page.locator("//tbody/tr");
        expect(numRow).toHaveCount(products.length);

        const numRow1 = (await page.locator("//tbody/tr").all()).length;
        expect(numRow1).toEqual(products.length);

        //Check từng dòng sản phẩm được add vào giỏ hàng
        for (let i = 0; i < numRow1; i++) {
            const proName = await page.locator(`//tbody/tr[${i + 1}]/td[1]`).innerText();
            const proPrice = Number((await page.locator(`//tbody/tr[${i + 1}]/td[2]`).innerText()).replace("$",""));
            const proQuantity = Number(await page.locator(`//tbody/tr[${i + 1}]/td[3]`).innerText());
            const proAmount = Number((await page.locator(`//tbody/tr[${i + 1}]/td[4]`).innerText()).replace("$",""));
            expect(proName).toEqual(products[i].productName);
            expect(proPrice).toEqual(products[i].price);
            expect(proQuantity).toEqual(products[i].numPurchase);
            expect(proAmount).toEqual(products[i].price*products[i].numPurchase);
            console.log(proName, proPrice, proQuantity, proAmount);
        }

        //Check tổng tiền phải trả của giỏ hàng
        expect(Number((await page.locator("//td[@class='total-price']").innerText()).replace("$",""))).toEqual(totalAmount);
        
    })

})