var container = document.querySelector('#mySales')
console.log(container);

var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : 0



fetch(`http://localhost/backend/api/sales/sellerSales.php?user_id=${id}`).then(response =>
    response.json()
).then(data => {
    console.log(data)
    data.data.forEach(elm => {
        fetch(`http://localhost/backend/api/item/readItem.php?id=${elm.Item_id}`)
            .then(response => response.json())
            .then(item => {
                var tr = document.createElement('tr')
                tr.innerHTML = `<tr><td><img src="https://s2.dmcdn.net/v/SJXad1U-e0K3cbLLX/x1080" alt=""></td><td>${item.NAME}</td><td>${item.price} DH</td><td>${elm.Quantity}</td><td>${elm.cost} DH</td><td>${elm.time}</td></tr>`
                console.log(tr);
                container.appendChild(tr)
                // console.log(all);
            })
    });

})


document.getElementById("qrButton").addEventListener('click', () => {
    document.getElementById("QrContainer").style.display = "flex";
})


function closeS() {
    document.getElementById("QrContainer").style.display = "none";
    container.innerHTML = ""

    fetch(`http://localhost/backend/api/sales/sellerSales.php?user_id=${id}`).then(response =>
        response.json()
    ).then(data => {
        console.log(data)
        data.data.forEach(elm => {
            fetch(`http://localhost/backend/api/item/readItem.php?id=${elm.Item_id}`)
                .then(response => response.json())
                .then(item => {
                    var tr = document.createElement('tr')
                    tr.innerHTML = `<tr><td><img src="https://s2.dmcdn.net/v/SJXad1U-e0K3cbLLX/x1080" alt=""></td><td>${item.NAME}</td><td>${item.price} DH</td><td>${elm.Quantity}</td><td>${elm.cost} DH</td><td>${elm.time}</td></tr>`
                    console.log(tr);
                    container.appendChild(tr)
                    // console.log(all);
                })
        });

    })
}
