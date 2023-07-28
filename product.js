let params = (new URL(document.location)).searchParams;
let id = params.get("id");
console.log(productName.innerText)

async function getProduct(id) {
    const response = await fetch('https://thecost17.onrender.com/getProduct/' + id);
    const json = await response.json();
    printOne(json)
}
getProduct(id);
console.log("")

function printOne(product) {
    table.innerHTML = ''
    productName.innerText = product.name
    let size = Object.keys(product.products[0]).length;
    for (let i = 1; i < size + 1; i++) {
        let name = product.products[0][i].name
        let quantity = product.products[0][i].quantity
        let unit = product.products[0][i].unit

        let newRow = `
        <tr  class="table1" >
        <th scope="row">${i}</th>
        <td>
        <input value="${name}" type="text" name="example" placeholder="اسم المنتج" list="exampleList">
                    <datalist id="exampleList">
                        
                    </datalist></td>
        </td>
        <td>
        <input type="text" value='${quantity}' placeholder="الكميه">
        <select>
                        <option ${unit == 1 && 'selected'}  value="kg">كيلو</option>
                        <option ${unit ==1000 && 'selected'} value="gm">جرام</option>
                        <option ${unit == 0 && 'selected'} value="number">عدد</option>
                    </select>
    </td>
        <td>
            <input type="text" placeholder=" السعر ">
        </td>
        <td>
        <h4>0</h4>
    </td>
        </tr>
        
        `
        table.insertAdjacentHTML('beforeend', newRow)
    }
    addButton.click();
    calcPrice(rows)
}