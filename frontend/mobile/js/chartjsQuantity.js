var ctx = document.getElementById('Qua')

var sales = (id) => {
  const lab = []
  const time = []
  let i = 0
  while(i<24){ lab.push(0) ; i++};
  i = 0
  while(i<24){ time.push(i) ; i++};
  const cleanlab = []
  fetch(`http://localhost/backend/api/sales/sellerSales.php?user_id=${id}`)
    .then(response => response.json())
    .then(all => {
      all.data.filter((elm) => {
          console.log(+elm.time.split(':')[0]);
          lab[+elm.time.split(':')[0]] = lab[+elm.time.split(':')[0]] + parseInt(elm.Quantity)
      })
      console.log({
        "lab" : lab,
        "time":time.sort((a,b)=>  a-b)
    });
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: time,
            datasets: [{
              label: 'today',
              data: lab,
              backgroundColor: [
                'rgba(83, 9, 148, 0.2)',
              ],
              borderColor: [
                'rgba(83, 9, 148,1)',
            ]}],
            borderWidth: 1,
        options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
        }});

  })
}

sales(15)



