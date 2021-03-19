

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
            var tr = document.createElement('tr')
            var date = elm.expiration_Date.split(' ')[0]
            tr.innerHTML = `
                <td><img src="https://s2.dmcdn.net/v/SJXad1U-e0K3cbLLX/x1080" alt="img"></td>
                <td>${elm.NAME}</td>
                <td>${elm.price} DH</td>
                <td>${date}</td>
                <td>${elm.brand}</td>
                <td>${elm.category}</td>
                <td>${elm.stock}</td>
                <td>
                <div>
                    <svg onclick="editItem(${elm.item_id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.41 32.187">
                        <path id="Icon_awesome-edit" data-name="Icon awesome-edit"
                            d="M24.75,4.877,30.3,10.162a.554.554,0,0,1,0,.809l-13.426,12.8-5.7.6a1.169,1.169,0,0,1-1.322-1.26l.633-5.438L23.9,4.877A.622.622,0,0,1,24.75,4.877Zm9.959-1.342-3-2.86a2.489,2.489,0,0,0-3.393,0L26.139,2.749a.554.554,0,0,0,0,.809l5.545,5.286a.622.622,0,0,0,.848,0l2.176-2.074a2.217,2.217,0,0,0,0-3.235Zm-11.1,16.753v5.965H3.934V7.5H18.061a.775.775,0,0,0,.523-.205l2.459-2.344a.7.7,0,0,0-.523-1.2H2.951A2.885,2.885,0,0,0,0,6.564V27.191A2.885,2.885,0,0,0,2.951,30H24.59a2.885,2.885,0,0,0,2.951-2.813V17.944a.744.744,0,0,0-1.26-.5L23.822,19.79A.7.7,0,0,0,23.607,20.288Z"
                            transform="translate(1 1.183)" fill="#1989fa" stroke="#000" stroke-width="2" />
                    </svg>
                    <svg onclick="deleteItem(${elm.item_id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.854 23.5">
                        <g id="Icon_feather-delete" data-name="Icon feather-delete" transform="translate(-0.5 -5)"
                            opacity="0.5">
                            <path id="Tracé_44" data-name="Tracé 44"
                                d="M30.458,6H11.635L1.5,16.75,11.635,27.5H30.458a2.8,2.8,0,0,0,2.9-2.687V8.688A2.8,2.8,0,0,0,30.458,6Z"
                                fill="#f60b0b" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" />
                            <path id="Tracé_45" data-name="Tracé 45" d="M27,13.5l-9,9"
                                transform="translate(-0.788 -1.25)" fill="none" stroke="#000" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" />
                            <path id="Tracé_46" data-name="Tracé 46" d="M18,13.5l9,9"
                                transform="translate(-0.788 -1.25)" fill="none" stroke="#000" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" />
                        </g>
                    </svg>
                </div>
            </td>`
            container.appendChild(tr)
        }) : null;
        items = data.data;
    })
}
fetch(`http://localhost/backend/api/item/readUserItems.php?user_id=${id}`).then(response =>
    response.json()
).then(data => {
    console.log(data)
    data.data ? data.data.forEach(elm => {
        var tr = document.createElement('tr')
        var date = elm.expiration_Date.split(' ')[0]
        tr.innerHTML = `
                <td><img src="https://s2.dmcdn.net/v/SJXad1U-e0K3cbLLX/x1080" alt="img"></td>
                <td>${elm.NAME}</td>
                <td>${elm.price} DH</td>
                <td>${date}</td>
                <td>${elm.brand}</td>
                <td>${elm.category}</td>
                <td>${elm.stock}</td>
                <td>
                <div>
                    <svg onclick="editItem(${elm.item_id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.41 32.187">
                        <path id="Icon_awesome-edit" data-name="Icon awesome-edit"
                            d="M24.75,4.877,30.3,10.162a.554.554,0,0,1,0,.809l-13.426,12.8-5.7.6a1.169,1.169,0,0,1-1.322-1.26l.633-5.438L23.9,4.877A.622.622,0,0,1,24.75,4.877Zm9.959-1.342-3-2.86a2.489,2.489,0,0,0-3.393,0L26.139,2.749a.554.554,0,0,0,0,.809l5.545,5.286a.622.622,0,0,0,.848,0l2.176-2.074a2.217,2.217,0,0,0,0-3.235Zm-11.1,16.753v5.965H3.934V7.5H18.061a.775.775,0,0,0,.523-.205l2.459-2.344a.7.7,0,0,0-.523-1.2H2.951A2.885,2.885,0,0,0,0,6.564V27.191A2.885,2.885,0,0,0,2.951,30H24.59a2.885,2.885,0,0,0,2.951-2.813V17.944a.744.744,0,0,0-1.26-.5L23.822,19.79A.7.7,0,0,0,23.607,20.288Z"
                            transform="translate(1 1.183)" fill="#1989fa" stroke="#000" stroke-width="2" />
                    </svg>
                    <svg onclick="deleteItem(${elm.item_id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.854 23.5">
                        <g id="Icon_feather-delete" data-name="Icon feather-delete" transform="translate(-0.5 -5)"
                            opacity="0.5">
                            <path id="Tracé_44" data-name="Tracé 44"
                                d="M30.458,6H11.635L1.5,16.75,11.635,27.5H30.458a2.8,2.8,0,0,0,2.9-2.687V8.688A2.8,2.8,0,0,0,30.458,6Z"
                                fill="#f60b0b" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" />
                            <path id="Tracé_45" data-name="Tracé 45" d="M27,13.5l-9,9"
                                transform="translate(-0.788 -1.25)" fill="none" stroke="#000" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" />
                            <path id="Tracé_46" data-name="Tracé 46" d="M18,13.5l9,9"
                                transform="translate(-0.788 -1.25)" fill="none" stroke="#000" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" />
                        </g>
                    </svg>
                </div>
            </td>`
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



function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector("#notBlured").style.filter = "blur(10px)";
    document.querySelector("input[name='name']").value = ""
    document.querySelector("textarea[name='description']").value = ""
    document.querySelector("input[name='price']").value = ""
    document.querySelector("input[name='expiration_Date']").value = ""
    document.querySelector("input[name='category']").value = ""
    document.querySelector("input[name='brand']").value = ""
    document.querySelector("#formProfuctButton").innerHTML = "Add Product"
    document.querySelector("#formProfuctButton").setAttribute('onclick', `CreateItem(${id})`)
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector("#notBlured").style.filter = "blur(0)";
}




function editItem(itemid) {
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
