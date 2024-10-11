// # Javascript
// ## Đề bài:
// Tuổi của một người được tính dựa trên năm sinh của họ và năm hiện tại. Trong bài tập này, bạn sẽ viết một hàm để tính tuổi dựa trên năm sinh được nhập vào. Biết công thức tính tuổi:
// ```
// Tuổi = Năm hiện tại - Năm sinh
// ```

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `calculateAge` để tính số tuổi của một người dựa trên năm sinh của họ.
// - In ra số tuổi tương ứng với năm hiện tại.
// - Nếu năm sinh lớn hơn năm hiện tại, in ra một thông báo lỗi "Năm sinh không hợp lệ."

// ## Ví dụ:
// **Input**:
// - Năm sinh: `1990`

// **Output**: 
// - Kết quả: `Tuổi của bạn là: 34`

// **Giải thích**: 
// Năm hiện tại là 2024, tuổi của người sinh năm 1990 sẽ là 2024 - 1990 = 34 tuổi.

// ## Ví dụ khác:
// - Năm sinh: `2025`

// **Output**:
// - Kết quả: `Năm sinh không hợp lệ`

// **Giải thích**:
// Vì năm sinh không thể lớn hơn năm hiện tại (2024), nên cần trả về thông báo lỗi.

// ### Gợi ý:
// Bạn có thể lấy năm hiện tại bằng cách sử dụng đối tượng `Date` trong JavaScript.

function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    if (birthYear > currentYear) {
        console.log("Năm sinh không hợp lệ");
        return;
    }
    const age = currentYear - birthYear;
    console.log(`Tuổi của bạn là: ${age}`);
    
}
calculateAge(1998);


// # Playwright
// ## Đề bài
// Viết code automation cho test case sau:
// - Đi tới trang: https://material.playwrightvn.com/
// - Click vào: Bài học 3: Todo page
// - Thêm vào todo có nội dung: Xin chào, đây là bài thực hành ngày 18 tháng 9
// - Verify chỉ có 1 Todo duy nhất được add vào.
// - Sửa nội dung Todo: Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa
// - Verify nội dung đã được chỉnh sửa
// - Xoá Todo
// - Verify Todo đã được xoá.

const {test, expect} = require('@playwright/test');

test('Challenge 18-09-2024', async ({page}) => {
    await test.step('Go to page material', async () => {
        await page.goto('https://material.playwrightvn.com/');
    })
    await test.step('Click session 3: Todo page', async () => {
        await page.locator("//a[contains(text(),'Todo page')]").click();
    })
    await test.step('Add todo', async () => {
        const todoInput = "Xin chào, đây là bài thực hành ngày 18 tháng 9"
        await page.locator("//input[@id='new-task']").fill(todoInput);
        await page.locator("//button[@id='add-task']").click();
    })
    await test.step('Verify only 1 todo added', async () => {
        const taskList = await page.locator("//ul[@id='task-list']").all();
        const numTasks = taskList.length;
        expect(numTasks).toEqual(1);
    })
    const editedTodo = "Xin chào, đây là bài thực hành ngày 18 tháng 9 - phiên bản đã chỉnh sửa";
    await test.step('Edit todo task', async () => {
        page.on('dialog', async dialog => {
            await dialog.accept(editedTodo);
        })
        await page.locator("//button[contains(text(),'Edit')]").click();
    })
    await test.step('Verify todo task is edited', async () => {
        expect(page.locator("//li/span")).toHaveText(editedTodo);
    })
    await test.step('Delete todo task', async () => {
        await page.locator("//button[contains(text(),'Delete')]").click();
        expect(page.locator("//ul[@id='task-list']/li")).toHaveCount(0);
    })
})