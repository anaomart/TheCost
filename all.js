let section = document.querySelector('section')
async function getAll() {
    const response = await fetch('https://thecost17.onrender.com/getAll');
    const json = await response.json();
    printAll(json);
}
const deleteProduct = async(id) => {
    fetch('https://thecost17.onrender.com/deleteProduct/' + id, {
            method: 'DELETE',
        })
        .then(res => res.text())
        .then(res => console.log(res))
    console.log("deleteProduct")
}

function printAll(array) {

    for (let i = 0; i < array.length; i++) {
        if (!array[i].name) {
            continue
        }

        let div = document.createElement('div');
        div.classList.add('product')

        let link = document.createElement('a');
        link.href = 'https://anaomart.github.io/TheCost/product.html?id=' + array[i]._id
        link.appendChild(document.createTextNode(array[i].name))

        let deleteBtn = document.createElement('button');
        deleteBtn.href = array[i]
        deleteBtn.appendChild(document.createTextNode('x'));
        deleteBtn.addEventListener('click', function() {
            deleteProduct(array[i]._id).then(() => {
                div.remove();
                console.log(div, array[i].name)
            })

        });

        div.appendChild(link);
        div.appendChild(deleteBtn);

        section.appendChild(div);
    }


}
getAll();
printAll(1);