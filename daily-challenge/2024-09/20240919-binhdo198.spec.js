// # Javascript
// ## Đề bài:
// Quản lý danh sách sản phẩm bằng Object.

// Trong bài tập này, bạn sẽ tạo một hệ thống quản lý danh sách sản phẩm bằng cách sử dụng đối tượng (Object). Mỗi sản phẩm sẽ có tên và giá, và bạn sẽ viết các hàm để thêm sản phẩm, xoá sản phẩm, và tính tổng giá trị của tất cả các sản phẩm trong danh sách.

// ### Yêu cầu:
// 1. Tạo một object `productList` để lưu trữ danh sách sản phẩm.
// 2. Viết hàm `addProduct(name, price)` để thêm sản phẩm vào danh sách. Sản phẩm sẽ có thuộc tính `name` (tên) và `price` (giá).
// 3. Viết hàm `removeProduct(name)` để xoá một sản phẩm khỏi danh sách theo tên sản phẩm.
// 4. Viết hàm `calculateTotal()` để tính tổng giá của tất cả sản phẩm trong danh sách.

// ## Ví dụ:
// **Input**: 
// - Thêm sản phẩm: `"Táo"`, giá: `5000`
// - Thêm sản phẩm: `"Chuối"`, giá: `3000`
// - Xoá sản phẩm: `"Chuối"`
// - Tính tổng giá trị sản phẩm.

// **Output**: 
// - Sản phẩm trong danh sách: `Táo: 5000`
// - Tổng giá trị sản phẩm: `5000`

// **Giải thích**:
// - Đầu tiên, thêm sản phẩm `"Táo"` với giá `5000`, sau đó thêm `"Chuối"` với giá `3000`.
// - Sau đó, xóa `"Chuối"` khỏi danh sách.
// - Cuối cùng, tính tổng giá của các sản phẩm trong danh sách còn lại.

const productList = {
    products: [],
    addProduct: function addProduct(name, price) {
        this.products.push({name,price});
    },
    removeProduct: function removeProduct(name) {
        this.products = this.products.filter(product => product.name !== name);
    },
    calculateTotal: function calculateTotal() {
        return this.products.reduce((total,product) => (total + product.price),0);
    },
    calculateTotal1: function calculateTotal1() {
        let total = 0;
        for(let i = 0; i < this.products.length; i++) {
            total = total + this.products[i].price
        }
        return total
    }

}
productList.addProduct("Táo",5000);
productList.addProduct("Chuối",3000);
productList.removeProduct("Chuối");
productList.addProduct("Nho",10000);
console.log("productList: "+productList.products);
console.log("total: "+productList.calculateTotal());
console.log("total1: "+productList.calculateTotal1());

// # Playwright
// ## Đề bài
// Viết code automation cho test case sau:
// - Đi tới trang: https://material.playwrightvn.com/
// - Click vào: Bài học 5: Puzzle drag and drop game
// - Kéo thả các ô 1, 2, 3, 4 vào ô tương ứng.
// - Verify message trong alert xuất hiện là: "Congratulations! You completed the puzzle."

const {test, expect} = require('@playwright/test');

test('Challenge 19-09-2024', async ({page}) => {
    await test.step('Go to page material', async () => {
        await page.goto('https://material.playwrightvn.com/');
    })
    await test.step('Click session 5: Puzzle drag and drop game', async () => {
        await page.locator("//a[contains(text(),'Bài học 5: Puzzle drag and drop game')]").click();
    })
    await test.step('Drag and drop puzzle', async () => {
        const puzzles = "//div[@class='puzzle-piece']";
        const numPuzzle = await page.locator(puzzles).count();
        console.log("Số mảnh ghép: "+numPuzzle);

        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe("Congratulations! You completed the puzzle.");
            console.log("message: ",dialog.message());
            await dialog.accept();
        })

        for (let i = 1; i <= numPuzzle; i++) {
            const puzzlePiece = page.locator(`//div[@id='piece-${i}']`);
            const dropzone = page.locator(`//div[@data-piece='${i}']`);
            await puzzlePiece.dragTo(dropzone);
            
        }
    })
})