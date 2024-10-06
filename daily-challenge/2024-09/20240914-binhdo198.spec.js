// # Javascript
// ## Đề bài:
// Chỉ số BMI (Body Mass Index) là một chỉ số được sử dụng để đánh giá mức độ béo hay gầy của một người, từ đó xác định tình trạng sức khỏe của cơ thể dựa trên chiều cao và cân nặng. Công thức tính BMI như sau:

// ```
// BMI = cân nặng (kg) / (chiều cao (m) * chiều cao (m))
// ```

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `calculateBMI` để tính chỉ số BMI dựa trên chiều cao (đơn vị mét) và cân nặng (đơn vị kg) của người dùng.
// - Sau khi tính toán, in ra kết quả với các phân loại theo chuẩn sau:
//   - BMI < 18.5: "Gầy"
//   - 18.5 <= BMI < 24.9: "Bình thường"
//   - 25 <= BMI < 29.9: "Thừa cân"
//   - BMI >= 30: "Béo phì"

// ## Ví dụ:
// **Input**: 
// - Chiều cao: 1.75 mét
// - Cân nặng: 68 kg

// **Output**: 
// - Kết quả BMI: 22.2
// - Phân loại: "Bình thường"

function calculateBMI(height, weight) {
    const BMI = weight/(height*height);
    let typeOfBMI = '';

    if (BMI < 18.5) {
        typeOfBMI = 'Gầy';
    } else if (BMI < 24.9) {
        typeOfBMI = 'Bình thường';
    } else if (BMI < 29.9) {
        typeOfBMI = 'Thừa cân';
    } else {
        typeOfBMI = 'Béo phì';
    }
       
    return{
        bmi: BMI,
        bodyType: typeOfBMI};
}

const result = calculateBMI(1.63,57);
console.log('- Kết quả BMI: ', result.bmi);
console.log('- Phân loại: ', result.bodyType);


// # Playwright
// ## Đề bài
// Viết code automation cho test case sau:
// - Đi tới trang: https://material.playwrightvn.com/
// - Click vào: Bài học 1: Register Page (có đủ các element)
// - Điền vào username, email. Click button register.
// - Kiểm tra kết quả có chứa username và email tương ứng

// ## Demo
// ![Demo image](../images/001-2024-09-01.gif)

const { test, expect } = require('@playwright/test');

const account = {
    username: 'challenge1409',
    email: 'challenge1409@gmail.com'
}

test('Challenge 14-09-2024', async ({ page }) => {
    await test.step('Go to page material', async () => {
        await page.goto('https://material.playwrightvn.com/');
    });
    await test.step('Click session 1: Register Page', async () => {
        await page.locator("//a[contains(text(),'Bài học 1: Register Page (có đủ các element)')]").click();
    });
    await test.step('Register account', async () => {
        await page.locator("//input[@id='username']").fill(account.username);
        await page.locator("//input[@id='email']").fill(account.email);
        await page.locator("//button[@type='submit']").click();
    })
    await test.step('Check register result', async () => {
        await expect(page.locator("//tbody//tr")).toHaveCount(1);
        await expect(page.locator("//tbody//td").nth(1)).toHaveText(account.username);
        await expect(page.locator("//tbody//td").nth(2)).toHaveText(account.email);
    })

})