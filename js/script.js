import Home from "./home.js"
import Product from "./product.js"
import Catalog from "./catalog.js"
import Action from "./action.js"
import Cart from "./cart.js"
import Order from "./order.js"

let homePage = new Home();
let productPage = new Product();
let catalogPage = new Catalog();
let actionPage = new Action();
let cartPage = new Cart();
let orderPage = new Order(cartPage);

let routs = {
    "home": '',
    "product": ['caramel', 'orangechoco', 'lavliheart', 'mangochia', 'strawberryyogurt',
                'brauni', 'caramelyoghurt', 'strawberryyoghurt', 'cherry', 'marakuya'],
    "catalog": ['Deserts', 'Cakes', 'Cheesecakes'],
    "action": ['cherry_fever', 'new_year', 'cake_sale'],
    "cart": ['caramel', 'orangechoco', 'lavliheart', 'mangochia', 'strawberryyogurt',
            'brauni', 'caramelyoghurt', 'strawberryyoghurt', 'cherry', 'marakuya', 'clear'],
    "order": ['1']
}

let pages = {
    "home": homePage,
    "product": productPage,
    "catalog": catalogPage,
    "action": actionPage,
    "cart": cartPage,
    "order": orderPage
}

const loader = `
    <div class="svg-loader">
    <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
        <circle fill="black" stroke="none" cx="6" cy="50" r="6">
            <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"/>    
        </circle>
        <circle fill="black" stroke="none" cx="26" cy="50" r="6">
            <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite" 
            begin="0.2"/>       
        </circle>
        <circle fill="black" stroke="none" cx="46" cy="50" r="6">
            <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite" 
            begin="0.3"/>     
        </circle>
    </svg>
    </div>
    `

function changePage(){
    document.getElementById("page-content").innerHTML = loader;

    const url = window.location.hash.substring(1);
    const splitedUrl = url.split('/');

    let hash;
    let subHash;

    if (splitedUrl.length == 2){
        hash = splitedUrl[0];
        subHash = splitedUrl[1];

        if (!loadContent(hash, subHash))
            homePage.loadHome();
    }

    else if (splitedUrl.length == 1) {
        hash = splitedUrl[0];

        if (!loadContent(hash))
            homePage.loadHome();
    }
    else {
        homePage.loadHome();
    }
}

function loadContent(route, hash=null) {
    if (route in routs) {
        if (hash != null && routs[route].includes(hash)) {
            let page = pages[route];
            if(!page.loadPage(hash))
                homePage.loadHome();
            return true;
        }
        else if (hash == null){
            let page = pages[route];
            if(!page.loadPage(hash))
                homePage.loadHome();
            return true;
        }
    }
    return false;
    
}




(function () {

    window.addEventListener('hashchange', () => changePage(homePage));

    homePage.loadHome();
    cartPage.loadPage()

})();

