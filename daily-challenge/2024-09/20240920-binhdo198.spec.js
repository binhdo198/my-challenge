// # Javascript
// ## Đề bài:
// Tìm số lớn nhất trong mảng.

// Cho một mảng các số nguyên, bạn cần tìm ra số lớn nhất trong mảng đó. Trong bài tập này, bạn sẽ viết một hàm để thực hiện việc tìm kiếm số lớn nhất.

// ### Yêu cầu:
// - Viết một hàm JavaScript có tên findLargestNumber để tìm số lớn nhất trong một mảng các số nguyên.
// - Nếu mảng rỗng, trả về thông báo "Mảng rỗng".

// ## Ví dụ:
// **Input**: 
// - Mảng: [3, 7, 2, 5, 9]

// **Output**: 
// - Kết quả: Số lớn nhất là: 9

// **Giải thích**:
// - Trong mảng [3, 7, 2, 5, 9], số lớn nhất là 9

function findLargestNumber(arrNum){
    if (arrNum.length === 0) {
        return 'Mảng rỗng';
    }
    // let maxNum = arrNum[0];
    //// Dùng for
    // for (let i = 0; i < arrNum.length; i++) {
    //     if (arrNum[i] > maxNum) {
    //         maxNum = arrNum[i];
    //     }
        
    // }
    //// Dùng forEach
    // arrNum.forEach(item => {
    //     if (item > maxNum) {
    //         maxNum = item;
    //     }
    // });
    // Dùng reduce()
    const maxNum = arrNum.reduce((max,current) => {
        // if(current > max){
        //     max = current;
        // }
        // return max
        return current > max ? current : max; //Toán tử 3 ngôi: condition ? valueIfTrue : valueIfFalse;
    }, arr[0])
    return `Kết quả: Số lớn nhất là: ${maxNum}`;
}

const arr = [1,8,20,6,4,34,55];
console.log(findLargestNumber(arr));

// # Playwright
// ## Đề bài
// Viết code automation cho test case sau:
// - Đi tới trang: https://material.playwrightvn.com/
// - Click vào: Bài học 5: Xử lý mouse event
// - Click vào ô: "Nhấn hoặc nhấn đúp vào đây!"
// - Kiểm tra: số lần nhấn = 1, loại nhấn: đơn, phím kèm theo: không có
// - Double click vào ô: "Nhấn hoặc nhấn đúp vào đây!"
// - Kiểm tra: số lần nhân = 3, loại nhấn: đúp, phím kèm theo: không có
// - Giữ shift và click vào ô: "Nhấn hoặc nhấn đúp vào đây!"
// - Kiểm tra: số lần nhấn = 4, loại nhấn: đơn, phím kèm theo: Shift