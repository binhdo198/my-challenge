// # Javascript
// ## Đề bài:
// Cho một mảng các số nguyên, bạn cần tính tổng của tất cả các phần tử trong mảng đó. Trong bài tập này, bạn sẽ viết một hàm để thực hiện việc tính tổng các số trong mảng.

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên `sumArray` để tính tổng các số trong mảng.
// - Nếu mảng rỗng, trả về thông báo `"Mảng rỗng"`.
// - Nếu mảng chứa các giá trị không phải là số, bỏ qua những giá trị đó.

// ## Ví dụ:
// **Input 1**:
// ```javascript
// [1, 2, 3, 4, 5]
// ```

// **Output 1**:
// ```javascript
// "Tổng là: 15"
// ```

// **Input 2**:
// ```javascript
// [1, "abc", 3, 4, "xyz", 5]
// ```

// **Output 2**:
// ```javascript
// "Tổng là: 13"
// ```

// **Input 3**:
// ```javascript
// []
// ```

// **Output 3**:
// ```javascript
// "Mảng rỗng"
// ```

function sumArray(arr){
    if(arr.length === 0){
        return "Mảng rỗng";
    }
    const total = arr.reduce((sum,current) => {
        return (Number(current) && typeof current !== 'boolean') ? sum + current : sum
    });
    return("Tổng là: "+total);
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 'a', 4, 'xyz', 5];
const arr3 = [3, true, 6];
const arr4 = [];
console.log("["+arr1+"] " + sumArray(arr1));
console.log("["+arr2+"] " + sumArray(arr2));
console.log("["+arr3+"] " + sumArray(arr3));
console.log("["+arr4+"] " + sumArray(arr4));
// # Playwright
// - Sử dụng fixture `request` trong Playwright để tạo mới 1 account.
// - Biết API documentation: https://demoqa.com/swagger/

const {test,expect} = require('@playwright/test');
const baseUrl = 'https://demoqa.com';
function randomUser(){
   return 'test_'+Math.random().toString(36).substring(2,10);
}
console.log("random user: "+randomUser());

const inputData = {
    userName: randomUser(),
    password: 'Test123@'
}

test('Create an account', async ({request}) => {
    const endPonit = '/Account/v1/User';
    const response = await request.post(baseUrl+endPonit, {
        data: inputData,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //Log response
    const responseData = await response.json();
    console.log(responseData);
    //Check status code
    expect(response.status()).toBe(201);
    //Check response data
    expect(responseData.userID).toBeTruthy();
    expect(responseData.username).toBe(inputData.userName);
})