

var container = document.querySelector('#Products')
console.log(container);

var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : 0

items = []

console.log("hell");
function updateData(id) {
    container.innerHTML = ""
    fetch(`http://localhost/backend/api/item/readUserItems.php?user_id=${id}`).then(response =>
        response.json()
    ).then(data => {
        console.log(data)
        data.data ? data.data.forEach(elm => {
            var tr = document.createElement('div')
            var date = elm.expiration_Date.split(' ')[0]
            tr.innerHTML = `
            <div class="z">
            <img src="img/P1.png" alt="img">
            <div class="nm">
                <span>${elm.NAME}</span>
                <span>${elm.description}</span>
            </div>
            <a onclick="openForm(${elm.item_id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4">
                    <path id="More-icon"
                        d="M16.334,2a2.185,2.185,0,0,1,2.333-2A2.186,2.186,0,0,1,21,2a2.186,2.186,0,0,1-2.334,2A2.186,2.186,0,0,1,16.334,2ZM8.167,2A2.186,2.186,0,0,1,10.5,0a2.185,2.185,0,0,1,2.333,2A2.186,2.186,0,0,1,10.5,4,2.186,2.186,0,0,1,8.167,2ZM0,2A2.186,2.186,0,0,1,2.334,0,2.185,2.185,0,0,1,4.666,2,2.186,2.186,0,0,1,2.334,4,2.186,2.186,0,0,1,0,2Z"
                        fill="#ff7f00" />
                </svg>
            </a>
            </div>
                `
            container.appendChild(tr)
        }) : null;
        items = data.data;
    })
}
fetch(`http://localhost/backend/api/item/readUserItems.php?user_id=${id}`).then(response =>
    response.json()
).then(data => {
    console.log(container);
    console.log(data)
    data.data ? data.data.forEach(elm => {
        var tr = document.createElement('div')
        var date = elm.expiration_Date.split(' ')[0]
        tr.innerHTML = `
        <div class="z">
        <img src="img/P1.png" alt="img">
        <div class="nm">
            <span>${elm.NAME}</span>
            <span>${elm.description}</span>
        </div>
        <a onclick="openForm(${elm.item_id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4">
                <path id="More-icon"
                    d="M16.334,2a2.185,2.185,0,0,1,2.333-2A2.186,2.186,0,0,1,21,2a2.186,2.186,0,0,1-2.334,2A2.186,2.186,0,0,1,16.334,2ZM8.167,2A2.186,2.186,0,0,1,10.5,0a2.185,2.185,0,0,1,2.333,2A2.186,2.186,0,0,1,10.5,4,2.186,2.186,0,0,1,8.167,2ZM0,2A2.186,2.186,0,0,1,2.334,0,2.185,2.185,0,0,1,4.666,2,2.186,2.186,0,0,1,2.334,4,2.186,2.186,0,0,1,0,2Z"
                    fill="#ff7f00" />
            </svg>
        </a>
        </div>
            `
        container.appendChild(tr)
    }) : null;
    items = data.data;
})

document.getElementById("myForm").style.display = "none";

const Name = document.querySelector("input[name='name']")
const description = document.querySelector("textarea[name='description']")
const price = document.querySelector("input[name='price']")
const date = document.querySelector("input[name='expiration_Date']")
const category = document.querySelector("input[name='category']")
const brand = document.querySelector("input[name='brand']")
const formProfuctButton = document.querySelector("#formProfuctButton")



// function openForm(item) {
//     console.log(item);
//     document.getElementById("myForm").style.display = "block";
//     document.querySelector("#notBlured").style.filter = "blur(10px)";
//     document.querySelector("input[name='name']").value = ""
//     document.querySelector("textarea[name='description']").value = ""
//     document.querySelector("input[name='price']").value = ""
//     document.querySelector("input[name='expiration_Date']").value = ""
//     document.querySelector("input[name='category']").value = ""
//     document.querySelector("input[name='brand']").value = ""
//     document.querySelector("#formProfuctButton").innerHTML = "Add Product"
//     document.querySelector("#formProfuctButton").setAttribute('onclick', `CreateItem(${id})`)
// }

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector("#notBlured").style.filter = "blur(0)";
}




function editItem(itemid) {
    console.log();
    document.getElementById("myForm").style.display = "block";
    document.querySelector("#notBlured").style.filter = "blur(10px)";
    errorName = document.querySelector("small#name").style.display = "none"
    errordescription = document.querySelector("small#description").style.display = "none"
    errorprice = document.querySelector("small#price").style.display = "none"
    errorexpiration = document.querySelector("small#expiration").style.display = "none"
    errorBrand = document.querySelector("small#Brand").style.display = "none"
    errorcategory = document.querySelector("small#category").style.display = "none"

    console.log(id);

    items.map((item) => {
        console.log();
        if (item.item_id == itemid) {
            console.log(item.NAME);
            Name.value = item.NAME
            description.value = item.description
            price.value = item.price
            date.value = item.expiration_Date
            category.value = item.category
            brand.value = item.brand
            formProfuctButton.innerHTML = "Edit Now"
            formProfuctButton.setAttribute('onclick', `updateItem(${itemid})`)
        }
    })
}
document.querySelector('.deleteConfiramtion').style.display = "none"


function updateItem(item) {
    console.log(id, item);
    const updatedItem = {
        item_id: item,
        NAME: Name.value,
        user_id: +id,
        description: description.value,
        price: +price.value,
        expiration_Date: date.value,
        category: category.value,
        brand: brand.value,
        stock: 600
    };
    console.log(updatedItem);
    fetch('http://localhost/backend/api/item/updateItem.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
    }).then(() => {
        console.log(id);
        updateData(id)
        closeForm()
    })

}
function CreateItem(id) {
    console.log(id);
    const newItem = {
        NAME: Name.value,
        user_id: id,
        description: description.value,
        price: +price.value,
        expiration_Date: date.value,
        category: category.value,
        brand: brand.value,
        stock: 600
    };
    console.log(newItem);
    fetch('http://localhost/backend/api/item/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    }).then(() => {
        console.log(id);
        updateData(id)
        closeForm()
    })

}


var itemTodelet = 0


function deleteItem(item) {
    document.querySelector('.deleteConfiramtion').style.display = "flex"
    itemTodelet = item
    console.log(item);
}

function verifyEdit(choise) {
    if (choise) {
        document.querySelector('.deleteConfiramtion').style.display = "none"
        fetch(`http://localhost/backend/api/item/deleteItem.php?id=${itemTodelet}`).then(() => {
            updateData(id)
        })

    } else {
        document.querySelector('.deleteConfiramtion').style.display = "none";
    }
}
function inputesCheker(input, err) {
    formProfuctButton.disabled = true
    console.log(errorName);
    console.log(formProfuctButton);
    input.addEventListener("blur", () => {
        if (!(/[\w\d]/g.test(input.value))) {
            formProfuctButton.disabled = true
            err.style.display = "block"
        }
    });
    input.addEventListener("focus", () => {
        formProfuctButton.disabled = false
        err.style.display = "none"
    });
}



var errorName = document.querySelector("small#name")
var errordescription = document.querySelector("small#description")
var errorprice = document.querySelector("small#price")
var errorexpiration = document.querySelector("small#expiration")
var errorBrand = document.querySelector("small#Brand")
var errorcategory = document.querySelector("small#category")

Name.addEventListener('input', inputesCheker(Name, errorName))
description.addEventListener('input', inputesCheker(description, errordescription))
date.addEventListener('input', inputesCheker(date, errorexpiration))
category.addEventListener('input', inputesCheker(category, errorcategory))
brand.addEventListener('input', inputesCheker(brand, errorBrand))
price.addEventListener('change', inputesCheker(price, errorprice))
