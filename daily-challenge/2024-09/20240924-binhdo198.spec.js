
// # Javascript
// ## Đề bài:
// Việc hiển thị ngày tháng hiện tại là một yêu cầu thường gặp trong các ứng dụng. Trong bài tập này, bạn sẽ viết một hàm để lấy ngày hiện tại và hiển thị nó theo định dạng dd/mm/yyyy.

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `getCurrentDate` để lấy ngày hiện tại và định dạng nó theo kiểu `dd/mm/yyyy`.
// - Hàm sẽ trả về ngày, tháng, và năm hiện tại, đảm bảo ngày và tháng luôn có 2 chữ số (ví dụ: ngày 1 thì phải hiển thị là 01).

// ## Ví dụ:
// **Output 1**:
// Output (với ngày hiện tại là 14 tháng 9, năm 2024):
// "Ngày hiện tại là: 14/09/2024"

// **Output 2**:
// Output khác (với ngày hiện tại là 5 tháng 1, năm 2024):
// "Ngày hiện tại là: 05/01/2024"

function getCurrentDate(){
    const today = new Date();
    let day = today.getDate();
    day < 10 ? day = '0' + day : day;
    let month = today.getMonth();
    month < 10 ? month = '0' + month : month;
    let year = today.getFullYear();

    return "Ngày hiện tại là: " + day + "/" + month + "/" + year;
}
console.log(getCurrentDate());

// # Playwright
// - Cho trang web sau: https://demo.playwright.dev/api-mocking/
// - Sử dụng kĩ thuật mocking trong Playwright để custom danh sách các loại quả trả về thành: ["Cam", "Táo", "Xoài"]

const {test, expect} = require('@playwright/test');

test('Challenge 24-09-2024: Mock API response to custom fruits list', async ({page}) => {
    //Chặn request đến API và giả lập dữ liệu trả về
    await page.route('*/**/api/v1/fruits', async route => {
        const jsonData = [{name: "Cam"}, {name: "Táo"}, {name: "Xoài"}];
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(jsonData)
          });
    });
    //Goto the page
    await page.goto('https://demo.playwright.dev/api-mocking/');

    //Check dữ liệu trên page
    const fruits = await page.locator("//ul/li").allTextContents();
    expect(fruits).toEqual(["Cam", "Táo", "Xoài"]);
})