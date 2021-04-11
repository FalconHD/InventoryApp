var container = document.querySelector('#StoreSales')
console.log(container);

var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : 0



fetch(`http://localhost/backend/api/sales/sellersSales.php`).then(response =>
    response.json()
).then(data => {

    for (elm in data) {
        console.log(data[elm]);
        data[elm]?data[elm].forEach(e => {
            console.log(e);
            var tr = document.createElement('tr')
            tr.innerHTML = `<tr>
            <td><img src="img/P1.png" alt="img"></td>
            <td>${e.Quantity}</td>
            <td>${e.Quantity}</td>
            <td>${e.cost}</td>
            <td>${e.time}</td>
            </tr>`
            container.appendChild(tr)
        }):null;

    }

})