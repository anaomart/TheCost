let section = document.querySelector('section')
async function getAll() {
    const response = await fetch('https://thecost17.onrender.com/getAll');
    const json = await response.json();
    for (let i = 0; i < json.length; i++) {
        console.log(json[i].name);
    }
    printAll(json);
}

function printAll(array) {

    for (let i = 0; i < array.length; i++) {
        console.log({ i: array[i].name });
        if (!array[i].name) {
            continue
        }
        let div = document.createElement('div');
        div.classList.add('product')
        let link = document.createElement('a');
        link.href = '/product.html?id=' + array[i]._id
        link.appendChild(document.createTextNode(array[i].name))
        div.appendChild(link)
        section.appendChild(div)
    }


}
getAll();
printAll(1);