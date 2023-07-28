let table = document.querySelector('.tableBody');
let rows = document.querySelectorAll('.table1')
let button = document.querySelector('button')
let addButton = document.querySelector('.image');
let list = document.querySelector('#exampleList')
let weight = document.querySelector('#weight')
let numberOfPieces = document.querySelector('.number-of-pieces')
let numbers = document.querySelector('#numbers')
let ListOfObjects = []
let obj = {}
let productName = document.querySelector('h1');
let select = document.querySelectorAll('select option')

function listUpdate() {
    if (localStorage.getItem('product')) {
        list.innerHTML = (Object.keys(JSON.parse(localStorage.getItem('product'))).map((ele, i) => {
            if (i == 0) return ""
            return `<option value=${ele}></option>`
        }))
    }
}
listUpdate();
console.log("")

let result = 0
let totalWeight = 0;

function calcPrice(rows) {
    console.log(select);
    [...rows, productName, ...select].map(ele => {
        ele.addEventListener('keyup', () => {
            let productName = document.querySelector('h1');
            let select = document.querySelectorAll('select')
            let total = 0;
            let price = 0;
            let quantity = 0;
            let pieceWeight = 0;
            result = 0;
            totalWeight = 0;
            numbers.innerText = 0;
            for (let i = 1; i < rows.length; i++) {
                let productZ = (((rows.item(i).children[1].children[0].value))) || ""
                if (localStorage.getItem('product')) {
                    if ((JSON.parse(localStorage.getItem('product'))[productZ]))
                        (rows.item(i).children[3].children[0].value) = (JSON.parse(localStorage.getItem('product'))[productZ])

                }

                let unit = select[i - 1].value == 'gm' ? 1000 : 1;
                price = Math.abs(((rows.item(i).children[3].children[0].value))) || "00"
                quantity = Math.abs((rows.item(i).children[2].children[0].value)) / unit || 0
                total = price * quantity

                let unitToDataBase = unit;



                result += +(price * quantity)
                if (select[i - 1].value == 'number') {
                    numbers.innerText = Number(numbers.innerText) + quantity;
                    quantity = 0;
                    unitToDataBase = 0
                }
                rows.item(i).children[4].children[0].innerText = total.toFixed(1);
                totalWeight += quantity;
                document.getElementById('weight').innerText = totalWeight;
                ////// To database 
                ListOfObjects[0] = (productName.innerText)
                if (!rows.item(i).children[1].children[0].value) {
                    continue;
                }
                console.log(unitToDataBase)
                obj[i] = { name: rows.item(i).children[1].children[0].value, quantity: rows.item(i).children[2].children[0].value, unit: unitToDataBase }



            };
            document.getElementById('cost').innerText = result.toFixed(1);

            ListOfObjects[1] = (obj)
            obj = {}

            console.log(ListOfObjects)
        })
    })

}
calcPrice(rows);

button.addEventListener('click', () => {

})
let num = 4;
addButton.addEventListener('click', () => {

            let newRow = `
        <tr  class="table1" >
        <th scope="row">${num}</th>
        <td>
        <input type="text" name="example" placeholder="اسم المنتج" list="exampleList">
                    <datalist id="exampleList">
                        
                    </datalist></td>
        </td>
        <td>
        <input type="text" placeholder="الكميه">
        <select>
                        <option selected  value="kg">كيلو</option>
                        <option value="gm">جرام</option>
                        <option value="number">عدد</option>
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
            rows = document.querySelectorAll('.table1')
            calcPrice(rows);

            num++;
        }

    )
    // print 
document.querySelector('.print').addEventListener('click', () => {
        window.print();
    })
    // add price to localStorage
let secondTable = document.querySelector('.staticTable')
document.querySelector('.addToLocalStorage').addEventListener('click', () => {
    let rows = document.querySelectorAll('.var');
    for (let i = 1; i < rows.length; i++) {
        let price = Math.abs(parseInt(rows.item(i).children[1].children[0].value)) || "0"
        let product = (((rows.item(i).children[0].children[0].value))) || "0"
            // clear add price input
        rows[i].lastElementChild.firstElementChild.value = ""
        rows[i].firstElementChild.firstElementChild.value = ""
        let newProducts = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : {}
        newProducts[product.trim()] = price;
        localStorage.setItem('product', JSON.stringify(newProducts))
    };
    listUpdate();
})
let overlay = document.querySelector('.overlay')

let addPrice = document.querySelector('.add');
addPrice.addEventListener('click', () => {
    overlay.style.display = 'block';
})
let add = document.querySelector('.addToLocalStorage')
add.addEventListener('click', () => {
        overlay.style.display = 'none';
    })
    // pieces by weight or opposite
let W = document.querySelector('.weight-of-pieces')
W.addEventListener('keyup', () => {
    numberOfPieces.value = (totalWeight / (W.value || 1)).toFixed(1)
})
let piecePrice = document.querySelector('.one-piece');
numberOfPieces.addEventListener('keyup', () => {
    let piece = (result / (numberOfPieces.value || 1))
    piecePrice.innerText = +piece.toFixed(2) || '00'
    let onePieceWeight = document.querySelector('.one-piece-weight')
    console.log(onePieceWeight)
    onePieceWeight.innerText = (totalWeight / (numberOfPieces.value || 1)).toLocaleString() || 0
    W.value = (totalWeight / (numberOfPieces.value || 1)).toLocaleString() || 0
    calcPrice(rows)

})

function sendDataToDataBase() {
    calcPrice(rows)
    const response = fetch('https://thecost17.onrender.com/storeProducts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: ListOfObjects[0], products: ListOfObjects[1] })
    })
    console.log(ListOfObjects)

}