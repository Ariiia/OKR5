import {getDB} from './mainDB.js';

export default class Cart {
    constructor(){
        this.hash = 'cart';
        
        this.products;
        this.totalPrice = 0;
        this.totalProducts = 0;
    }

    async loadPage(subHash) {

        this.products = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/products');

        if (subHash == null){
            this.loadCart();
            return false;
        }
        else {
            if(subHash == 'clear'){
                this.clearCart();
            }
            else {
                this.addItemToCartLocalStorage(subHash);
            }
        }

        return true;
    }

    loadCart() {
        const page = document.getElementById('page-content');
        
        let itemsInCart = [];
        let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
        cartLocalStorage.forEach(item => {
            itemsInCart.push(item.url);
        });

        let itemsToShow = this.products.filter(product => {
            return itemsInCart.includes(product.url);
        });

        page.innerHTML = this.loadCartTemplate();

        if(cartLocalStorage.length == 0){
            // disable buttons
        } else {
            // enable 
        }

        let cart_body = document.querySelector('.cart-body');
        let counterCart = document.getElementById('cart-counter');
        let totalPriceEl = document.getElementById('total-price');


        itemsToShow.forEach(item => {
            let item_amount = this.getAmountFromLocalStorage(item.url);

            this.totalProducts += item_amount;
            counterCart.innerText = this.totalProducts;

            this.totalPrice += (item.price * item_amount);
            totalPriceEl.innerText = (this.totalPrice);

            let amount = cartLocalStorage.filter(itemShow => {
                return item.url === itemShow.url;
            })[0].amount;

            cart_body.innerHTML += this.loadCartDesertTemplate(item, amount);

            
        });

        itemsToShow.forEach(item => {
            let delete_btn = document.getElementById('delete-' + item.url);
            delete_btn.addEventListener('click', (e) => {
                e.preventDefault();
                cartLocalStorage.forEach(localItem => {
                    if(localItem.url == item.url){
                        counterCart.innerText = parseInt(counterCart.innerText) - localItem.amount;
                        cartLocalStorage.splice(cartLocalStorage.indexOf(localItem), 1);
                    }
                });   
                             
                localStorage.setItem('cart', JSON.stringify(cartLocalStorage));
    
                this.loadCart();
            });
        });

        this.totalPrice = 0;
        this.totalProducts = 0;

        
    }

    addItemToCartLocalStorage(subHash) {
        window.location = '#product/' + subHash;
        let counterCart = document.getElementById('cart-counter');

        let itemsCart = JSON.parse(localStorage.getItem('cart'));

        if(!itemsCart){
            itemsCart = [];
            itemsCart.push({url: subHash, amount: 1});
            localStorage.setItem('cart', JSON.stringify(itemsCart));
            counterCart.innerText = parseInt(counterCart.innerText) + 1;
            return true;
        }

        let exist = false;
        for (let i = 0; i < itemsCart.length; i++) {
            if (itemsCart[i].url === subHash){
                itemsCart[i].amount++;
                exist = true;
                break;
            }
        }

        if (!exist){
            itemsCart.push({url: subHash, amount: 1});
            localStorage.setItem('cart', JSON.stringify(itemsCart));
            counterCart.innerText = parseInt(counterCart.innerText) + 1;
            return true;
        }

        
        localStorage.setItem('cart', JSON.stringify(itemsCart));

        counterCart.innerText = parseInt(counterCart.innerText) + 1;

        return false;
    }

    getAmountFromLocalStorage(url) {
        let itemsCart = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < itemsCart.length; i++) {
            if (itemsCart[i].url === url){
                return itemsCart[i].amount;
            }
        }
    }

    loadCartTemplate() {
        return `
            <div id="cartcont">
                <div class="cart-top">
                    <h10 class="cart-title">Корзина</h10>
                </div>
                <div class="cart-content">
                    <ul class="cart-body">
                        
                    </ul>
                    <p class="total">
                        <strong>Подытог:</strong>
                        <strong><span class="amount" id="total-price">${this.totalPrice}</span> ₴</strong>
                    </p>
                    <p class="cart-button">
                        <a href="#order"class="button checkout">
                            Оформление заказа
                        </a>
                    </p>
                </div>
            </div>
        `;
    }

    loadCartDesertTemplate(desert, amount) {
        return `
                        <li class="cart-desert">
                            <a href="#cart" class="remove-from-cart" id="delete-${desert.url}" aria-label="Remove this item">
                                ×
                            </a> 
                                <span class="item-image">
                                <a href="#product/${desert.url}">
                                    <img src="${desert.image}" alt="" width="200" height="200">
                                </a>
                            </span>
                            <span class="cart-description">
                                <span class="cart-text">Название:   </span>
                                <a href="#product/${desert.url}" class="item-name">
                                    ${desert.title}
                                </a>
                                <span class="cart-quantity">
                                    <div class="quantity">
                                        <span class="cart-text" id="amount-${desert.url}">Количество: ${amount}</span>
                                        <!-- количество 
                                        <input type="number"  class="input-text"
                                            step="1" min="0" max="" 
                                            value="2" title="Кол-во" size="10" inputmode="numeric"
                                        >
                                        -->
                                    </div>
                                </span>
                                <span class="item-price">
                                    <span class="cart-text">Стоимость:   </span>
                                    ${desert.price * amount}
                                </span>
                                ₴
                            </span>
                        </li>
        `;
    }


    clearCart(){
        localStorage.setItem('cart', JSON.stringify([]));

        this.totalPrice = 0;
        this.totalProducts = 0;

        let counterCart = document.getElementById('cart-counter');
        counterCart.innerText = 0;

        //this.loadPage();
    }

}
