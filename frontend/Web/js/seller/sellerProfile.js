
document.getElementById("myForm").style.display = "none";
const Name = document.querySelector("input[name='name']")
const email = document.querySelector("input[name='email']")
const phone = document.querySelector("input[name='phone']")
const address = document.querySelector("input[name='address']")

const inputFile = document.querySelector("#fileElem")
errorName = document.querySelector("small#name")
errorEmeil = document.querySelector("small#email")
errorPhone = document.querySelector("small#phone")
errorAddress = document.querySelector("small#address")
var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : 0

function editProfile() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector("#notBlured").style.filter = "blur(10px)";



    fetch(`http://localhost/backend/api/userbyid.php?user_id=${id}`)
        .then(response =>
            response.json()
        ).then(user => {

            Name.value = user.NAME;
            email.value = user.email
            phone.value = user.phone
            address.value = user.address
           
        })
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector("#notBlured").style.filter = "blur(0)";
}

function UpdateProfile() {
    console.log(inputFile.files);
    let fd = new FormData();
    fd.append('file', inputFile.files[0]);



    const user = {
        NAME: Name.value,
        email: email.value,
        phone: phone.value,
        address: address.value
    }
    fetch(`http://localhost/backend/api/updateUser.php?user_id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        fetch(`http://localhost/backend/api/upload.php?user_id=${id}`, {
            method: 'POST',
            body: fd
        }).then(response => response.json()).then(data => console.log(data))


        closeForm()
        fetch(`http://localhost/backend/api/UserById.php?user_id=${id}`).then(response => response.json()).then(data => {

            profile.forEach(elm => {
                for (e in data) {
                    const item = elm.querySelector(`#${e}`)
                    if (item) { item.innerHTML = data[e] }
                }

            })
        })
    })

}





const profile = document.querySelectorAll('.c2')


var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : null


if (id) {


    fetch(`http://localhost/backend/api/UserById.php?user_id=${id}`).then(response => response.json()).then(data => {

        profile.forEach(elm => {
            for (e in data) {
                const item = elm.querySelector(`#${e}`)
                if (item) { item.innerHTML = data[e] }
            }

        })
    })




}

function logOut() {

    window.localStorage.removeItem('id')
    location.pathname = "login.html"
}







function inputesCheker(input, err, reg) {



    input.addEventListener("blur", () => {
        if (!reg.test(input.value)) {
            err.style.display = "block"
            formProfuctButton.disabled = true
        }
    });
    input.addEventListener("focus", () => {
        err.style.display = "none"
        formProfuctButton.disabled = false

    });
}




Name.addEventListener('input', inputesCheker(Name, errorName, /[A-Za-z]/g))
email.addEventListener('input', inputesCheker(email, errorEmeil, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
phone.addEventListener('input', inputesCheker(phone, errorPhone, /\d/g))
address.addEventListener('input', inputesCheker(address, errorAddress, /[A-Za-z]/g))

