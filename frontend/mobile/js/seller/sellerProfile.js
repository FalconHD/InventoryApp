
document.getElementById("myForm").style.display = "none";
const Name = document.querySelector("input[name='name']")
const email = document.querySelector("input[name='email']")
const phone = document.querySelector("input[name='phone']")
const address = document.querySelector("input[name='address']")
errorName = document.querySelector("small#name")
errorEmeil= document.querySelector("small#email")
errorPhone = document.querySelector("small#phone")
errorAddress = document.querySelector("small#address")

function editProfile(id) {
    document.getElementById("myForm").style.display = "block";
    document.querySelector("#notBlured").style.filter = "blur(10px)";
 
    console.log(Name);


    idX = 15
    fetch(`http://localhost/backend/api/userbyid.php?user_id=15`)
        .then(response =>
            response.json()
        ).then(user => {
            console.log(user);
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











function inputesCheker(input, err , reg) {

    console.log(err);

    input.addEventListener("blur", () => {
        if(!reg.test(input.value)){err.style.display = "block"}
    });
    input.addEventListener("focus", () => {
        err.style.display = "none"
    });
}



Name.addEventListener('input', inputesCheker(Name, errorName,/[A-Za-z]/g))
email.addEventListener('input', inputesCheker(email, errorEmeil,/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
phone.addEventListener('input', inputesCheker(phone, errorPhone,/\d/g))
address.addEventListener('input', inputesCheker(address, errorAddress,/[A-Za-z]/g))

