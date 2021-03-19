function ofTheFirstLoad() {
    if (window.innerWidth < 500) {
        location.replace(`http://localhost:3002`);
    }
}
ofTheFirstLoad()
window.onresize = () => {
    var path = window.location.pathname;
    console.log(`http://localhost:3002${path}`);

    if (window.innerWidth < 500) {
        location.replace(`http://localhost:3002${path}`);

    } else if (window.innerWidth > 500) {
        location.replace(`http://localhost:3000${path}`);

    }
}



const auth = window.localStorage.getItem('id')
if (!auth && window.innerWidth > 500) {
    console.log(auth);
    window.location.pathname == "/login.html" ? null : window.location.pathname = "/login.html"
}