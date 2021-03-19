var cts = document.getElementById('revenue')

Chart.defaults.global.defaultFontColor = "#fff"

var sales = (id) => {
  const re = []
  const time = []
  let i = 0
  while (i < 24) { re.push(0); i++ };
  i = 0
  while (i < 24) { time.push(i); i++ };
  const cleanlab = []
  fetch(`http://localhost/backend/api/sales/sellersSales.php`)
    .then(response => response.json())
    .then(all => {
      for (elm in all) {
        all[elm].forEach(elm => {
          console.log(+elm.time.split(':')[0]);
          re[+elm.time.split(':')[0]] = re[+elm.time.split(':')[0]] + parseInt(elm.cost)
        })
      }

      console.log({
        "re": re,
        "time": time.sort((a, b) => a - b)
      });
      var myChart = new Chart(cts, {
        type: 'line',
        data: {
          labels: time,
          borderColor: "#fff",
          datasets: [{
            label: 'today',
            data: re,
            backgroundColor: [
              'rgba(237, 124, 19, 0.2)',
            ],
            borderColor: [
              'rgba(237, 124, 19,1)',
            ],
            fontColor: '#fff'
          }],
          borderWidth: 1,
          options: {
            scales: {
              gridLines: {
                color: "rgba(237, 124, 19,1)",
                lineWidth: 2,
                zeroLineColor: "rgba(237, 124, 19,1)",
                zeroLineWidth: 2
              },
            }
          }
        }
      });

    })
}
var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : 0
sales(id)



