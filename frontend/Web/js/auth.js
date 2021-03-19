const email = document.querySelector('#email')
const password = document.querySelector('#password')
const login = document.querySelector('#login')
const username = document.querySelector('#username')


function loginButton() {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value) && password.value != "") {
        const loginInfo = {
            email: email.value,
            password: password.value
        }

        fetch('http://localhost/backend/api/Login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    window.localStorage.setItem('id', data.result.user_id)
                    window.location.href = "index.html"
                } else {
                    container.style.display = "flex"
                    const er = document.querySelector('#errorName')
                    er.innerHTML = data.error
                }
            })
    } else {
        container.style.display = "flex"
        const er = document.querySelector('#errorName')
        er.innerHTML = 'please check your data'
    }
}

function loginButton1(loginInfo) {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value) && password.value != "") {
        fetch('http://localhost/backend/api/Login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }).then(response => response.json())
            .then(data => {
                window.localStorage.setItem('id', data.result.user_id)
                window.location.href = "index.html"
            })
    } else {
        container.style.display = "flex"
        const er = document.querySelector('#errorName')
        er.innerHTML = 'please check your data'
    }
}


function registerButton() {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value) && password.value != "") {
        const registerInfo = {
            NAME: username.value,
            email: email.value,
            password: password.value
        }
        console.log(registerInfo);
        fetch('http://localhost/backend/api/addUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerInfo)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.message) {
                    ((`${data[0].split(':')[0]}`) === 'error ') ? popRegister(data) : console.log("none");
                } else {
                    console.log(data.message);
                    loginButton1({
                        email: email.value,
                        password: password.value
                    });
                }

            })

    } else {
        container.style.display = "flex"
        const er = document.querySelector('#errorName')
        er.innerHTML = 'please check your data'
    }
}

const container = document.querySelector('.deleteConfiramtion')
container.style.display = "none"
function popRegister(data) {
    container.style.display = "flex"
    const er = document.querySelector('#errorName')
    er.innerHTML = `${data[0].split(':')[3]}`
}

function tryAgain() {
    container.style.display = "none"
}

