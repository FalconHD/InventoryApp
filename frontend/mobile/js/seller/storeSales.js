var container = document.querySelector('#mySales')
console.log(container);

var id = 1


console.log("hell");
fetch(`http://localhost/backend/api/sales/sellersSales.php`).then(response =>
    response.json()
).then(data => {
    // console.log(data)
    var dataTable = Array.from(data)
    for (elm in data) {
        console.log(data[elm]);
        var tr = `<tr>
            <td><img src="img/P1.png" alt="img"></td>
            <td><img class="imguser" src="img/S1.png" alt="img"></td>
            <td>19 DH</td>
            <td> 3</td>
            <td>57 DH</td>
            <td>6.10 <br>01-03-2021</td>
            </tr>`
    }
})