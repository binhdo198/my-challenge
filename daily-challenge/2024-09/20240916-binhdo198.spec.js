// # Javascript
// ## Đề bài:
// Chuỗi (string) là một tập hợp các ký tự nối liền nhau. Trong bài tập này, bạn sẽ viết một hàm để đảo ngược chuỗi, tức là sắp xếp các ký tự của chuỗi theo thứ tự ngược lại.

// ### Yêu cầu:
// Viết một hàm JavaScript có tên reverseString để đảo ngược một chuỗi đầu vào.
// Sau khi đảo ngược chuỗi, in ra kết quả.

// ## Ví dụ:
// ### Input:
// Chuỗi: "hello"

// ### Output:
// Chuỗi đảo ngược: "olleh"
// Giải thích: Chuỗi "hello" khi đảo ngược sẽ trở thành "olleh", các ký tự từ cuối chuỗi sẽ chuyển lên đầu.

// ## Gợi ý:
// Để giải quyết bài toán này, bạn có thể:
// - Tách chuỗi thành một mảng các ký tự bằng cách sử dụng phương thức split('').
// - Sử dụng phương thức reverse() để đảo ngược mảng ký tự.
// - Nối các ký tự lại thành chuỗi bằng cách sử dụng phương thức join('').

function reverseString(str) {
    let revStr = str.split('').reverse().join('');
    return revStr;
}

const revStr = reverseString("nvthgirwyalp");
console.log("Chuỗi đảo ngược: ", revStr);


// # Playwright
// Viết code automation cho test case sau (có thể sử copy code từ bài trước để code nhanh hơn)
// - Đi tới trang: https://material.playwrightvn.com/
// - Click vào: Bài học 1: Register Page (có đủ các element)
// - Điền vào đầy đủ các thông tin của user
// - Kiểm tra kết quả đúng như thông tin đã điền.

const { test, expect } = require('@playwright/test');

const account = {
    username: 'challenge1609',
    email: 'challenge1609@gmail.com',
    gender: 'female',
    hobbies: ['reading','traveling'],
    interest: ['technology','science','music'],
    country: 'canada',
    dateOfBirth: '1998-09-16',
    profilePicture: './daily-challenge/2024-09/profilePicture.jpg',
    biography: 'Hello yellow!!',
    rateUs: '8',
    favorColor: '#EA8A8A',

}


test('Challenge 14-09-2024', async ({ page }) => {
    await test.step('Go to page material', async () => {
        await page.goto('https://material.playwrightvn.com/');
    });
    await test.step('Click session 1: Register Page', async () => {
        await page.locator("//a[contains(text(),'Bài học 1: Register Page (có đủ các element)')]").click();
    });
    await test.step('Register account with full info', async () => {
        //input info
        await page.locator("//input[@id='username']").fill(account.username);
        await page.locator("//input[@id='email']").fill(account.email);
        await page.locator("//input[@id='"+account.gender+"']").click();
        for (let i = 0; i < account.hobbies.length; i++) {
            await page.locator("//input[@id='"+account.hobbies[i]+"']").click(); 

        }
        // for (let j = 0; j < account.interest.length; j++) {
        //     await page.locator("//option[@value='"+account.interest[j]+"']").click();
            
        // }
        await page.locator("//select[@id='interests']").selectOption(account.interest);
        await page.locator("//select[@id='country']").selectOption(account.country);
        await page.locator("//input[@id='dob']").fill(account.dateOfBirth);
        //Select File
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator("//input[@id='profile']").click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(account.profilePicture);

        await page.locator("//textarea[@id='bio']").fill(account.biography);
        await page.locator("//input[@id='rating']").fill(account.rateUs);
        await page.locator("//input[@id='favcolor']").fill(account.favorColor.toLocaleLowerCase());

        // click Register button
        await page.locator("//button[@type='submit']").click();
    })
    await test.step('Check register result', async () => {
        await expect(page.locator("//tbody//tr")).toHaveCount(1);
        await expect(page.locator("//tbody//td").nth(1)).toHaveText(account.username);
        await expect(page.locator("//tbody//td").nth(2)).toHaveText(account.email);

        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Gender: ${account.gender}`);
        const hobbies = account.hobbies.join(', ');
        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Hobbies: ${hobbies}`);
        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Country: ${account.country}`);
        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Date of Birth: ${account.dateOfBirth}`);
        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Biography: ${account.biography}`);
        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Rating: ${account.rateUs}`);
        await expect(page.locator("//tbody//td").nth(3)).toContainText(`Favorite Color: ${account.favorColor.toLocaleLowerCase()}`);
    })

})