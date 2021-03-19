var cts = document.getElementById('revenue')

Chart.defaults.global.defaultFontColor = "#fff"

var sales = (id) => {
  const re = []
  const time = []
  let i = 0
  while(i<24){ re.push(0) ; i++};
  i = 0
  while(i<24){ time.push(i) ; i++};
  const cleanlab = []
  fetch(`http://localhost/backend/api/sales/sellerSales.php?user_id=${id}`)
    .then(response => response.json())
    .then(all => {
      all.data.filter((elm) => {
          console.log(+elm.time.split(':')[0]);
          re[+elm.time.split(':')[0]] = re[+elm.time.split(':')[0]] + parseInt(elm.cost)
      })
      console.log({
        "re" : re,
        "time":time.sort((a,b)=>  a-b)
    });
        var myChart = new Chart(cts, {
          type: 'line',
          data: {
            labels: time,
            borderColor : "#fff",
            datasets: [{
              label: 'today',
              data: re,
              backgroundColor: [
                'rgba(237, 124, 19, 0.2)',
              ],
              borderColor: [
                'rgba(237, 124, 19,1)',
            ],
          fontColor : '#fff'}],
            borderWidth: 1,
        options: {
          scales: {
              gridLines:{
                color: "rgba(237, 124, 19,1)",
                lineWidth:2,
                zeroLineColor :"rgba(237, 124, 19,1)",
                zeroLineWidth : 2
              },
          }
      }
        }});

  })
}

sales(15)





//next Chart 


const nexChart = document.querySelector("#nextChart")
const Con= document.querySelector(".canvass")
const bigCon= document.querySelector("#chartsContainer")
console.log(nexChart);
var a= false
Qua.style.display ='none'
nexChart.addEventListener('click',function(){
  nexChart.querySelector('img').style.transform = "rotate(180deg)"
  const Qua=document.querySelector("#Qua")
  const revenue=document.querySelector("#revenue")
  
  if(a){
    Qua.style.display ='none'
    revenue.style.display ='block'
    a=false
    nexChart.querySelector('img').style.transform = "rotate(0deg)"
    
  }else{
    Qua.style.display ='block'
    revenue.style.display ='none'
    a = true 
  
  }


})