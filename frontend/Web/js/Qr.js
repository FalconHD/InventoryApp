import QrScanner from 'https://cdn.jsdelivr.net/npm/qr-scanner@1.2.0/qr-scanner.min.js';
QrScanner.WORKER_PATH = 'js/qr-scanner-worker.min.js'

// console.log(QrScanner);
const videoElement = document.querySelector("#qr")
const quantity = document.querySelector("#quantity")
const t = document.querySelector("#t")
const start = document.querySelector('#start')

const ids = new Set()
const q = new Set()
var totalCost ;



function qUpdate(result,quantity){
  fetch(`http://localhost/backend/api/item/readItem.php?id=${result}`, {
      'method': 'GET',
      header: {
        'Content-type': 'application/json'
      }}).then(response => response.json()).then(data =>{
        console.log(data);
        if(parseInt(data.stock) >= parseInt(quantity)){
          q.add(quantity.value)
          console.log(totalCost);
          var updateQantotydata = data
          updateQantotydata.stock = data.stock - quantity
          updateQantotydata.stock = data.stock - quantity
          console.log(quantity);
          fetch(`http://localhost/backend/api/item/updateItem.php`,{
            'method': 'POST',
            header: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(updateQantotydata)
          })
        }else{
          ids.delete(result)
        }
        
      })
}


start.addEventListener('click',() =>{
  const sal = Array.from(ids)
  const QQ = Array.from(q)
  console.log(sal,QQ,totalCost);
  sal.forEach((id,idx) => {
    qUpdate(id,QQ[idx])
    fetch('http://localhost/backend/api/sales/newSale.php', {
    'method': 'POST',
    header: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': 15,
      'item_id': id,
      'quantity': QQ[idx]
    })
  }).then(response => response.json()).then(res => console.log(res))
  })
})

const Qrcanner = new QrScanner(videoElement, result => {

  if (quantity.value) {
    ids.add(result)
    q.add(quantity.value)
  }

  t.innerHTML = ''
  console.log(ids);
  ids.forEach(id => {
    const newitem = document.createElement('span')
    console.log(`http://localhost/backend/api/item/readItem.php?id=${id}`);
    fetch(`http://localhost/backend/api/item/readItem.php?id=${id}`, {
      'method': 'GET',
      header: {
        'Content-type': 'application/json'
      }}).then(response => response.json()).then(data =>{
        data.NAME?newitem.innerHTML = `${data.NAME} || `:newitem.innerHTML = `not exist || `
        t.appendChild(newitem)
      })
    
  });
});



Qrcanner.start();














