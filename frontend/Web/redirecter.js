var id = window.localStorage.getItem('id') ? window.localStorage.getItem('id') : null
function ofTheFirstLoad() {
    if (id && window.innerWidth < 500) {
        location.replace(`http://localhost:3000?id=${id}`);
    } else if (window.innerWidth < 500) {
        location.replace(`http://localhost:3000`);
    }
}

ofTheFirstLoad()

window.onresize = () => {
    var path = window.location.pathname;
    console.log(`http://localhost:3002${path}`);

    if (window.innerWidth < 500) {
        id ? location.replace(`http://localhost:3002${path}?id=${id}`) : location.replace(`http://localhost:3002${path}`);
    }
}



const auth = window.localStorage.getItem('id')
if (!auth && window.innerWidth > 500) {
    console.log(auth);
    window.location.pathname == "/login.html" ? null : window.location.pathname = "/login.html"

} else if (window.location.pathname == "/login.html") {
    location.replace(`http://localhost:3000/`);
}



let params = new URLSearchParams(document.location.search.substring(1));
let theTranferedId = params.get("id");
if (theTranferedId) {
    if(window.localStorage.getItem('id') == theTranferedId){
        console.log('same');
        location.replace(window.location.href.split('?')[0]);
    }else{
     window.localStorage.setItem('id', theTranferedId)
     location.replace(window.location.href.split('?')[0]);
    }
   
}

