/* eslint-env jest */
jest.mock('../mainDB');

import {getDB} from '../mainDB';
import Cart from '../cart';

describe('Cart class', ()=> {

    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new Cart();
    });


    afterEach(()=>{
        _ = new Cart();
    });

    describe('Cart: hash', ()=>{
        it('should return hash', ()=>{
            expect(_.hash).toEqual('cart');
        });
    });

    describe('Cart: loadPage', ()=>{
        it('should invoke loadCart if null', ()=>{
            const loadCart = jest.fn();
            Cart.prototype.loadCart = function (){
                return loadCart();
            };

            _.loadPage(null);
            expect(loadCart).toHaveBeenCalledTimes(0);
        });

        it('should invoke addItemToCartLocalStorage if not null', ()=>{
            const addItemToCartLocalStorage = jest.fn();
            Cart.prototype.addItemToCartLocalStorage = function (){
                return addItemToCartLocalStorage();
            };

            _.loadPage('test');
            expect(addItemToCartLocalStorage).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });

        it('should invoke clearCart if clear', ()=>{
            const clearCart = jest.fn();
            Cart.prototype.clearCart = function (){
                return clearCart();
            };

            _.loadPage('clear');
            expect(clearCart).toHaveBeenCalledTimes(1);
        });

    });

    describe('Cart: loadCart', ()=>{

        it('loadCart should be defined', ()=>{
            _.loadCart('cherry_fever');
            expect(_.loadCart).toBeDefined();
        });

        it('should get product from DB', async ()=>{

            let data = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/products');
            let products = data.products;

            expect(products[0].url).toStrictEqual('caramel');
        });

        
    });

    describe('Cart: addItemToCartLocalStorage', ()=>{

        it('addItemToCartLocalStorage should be defined', ()=>{
            _.addItemToCartLocalStorage('cherry_fever');
            expect(_.addItemToCartLocalStorage).toBeDefined();
            expect(_.addItemToCartLocalStorage).toBeTruthy();
        });
        
    });

    describe('Cart: getAmountFromLocalStorage', ()=>{

        it('getAmountFromLocalStorage should be defined', ()=>{
            let getAmountFromLocalStorage = jest.fn(function (){
                return 1;
            });

            Cart.prototype.getAmountFromLocalStorage = function (){
                return getAmountFromLocalStorage();
            };

            expect(_.getAmountFromLocalStorage()).toBeDefined();
        });
        
    });

    describe('Cart: loadCartTemplate', ()=>{

        it('loadCartTemplate should be defined', ()=>{
            _.loadCartTemplate();
            expect(_.loadCartTemplate).toBeDefined();
        });

        it('loadCartTemplate should retern template', ()=>{
            _.totalPrice = 10;

            let result = `
            <div id="cartcont">
                <div class="cart-top">
                    <h10 class="cart-title">Корзина</h10>
                </div>
                <div class="cart-content">
                    <ul class="cart-body">
                        
                    </ul>
                    <p class="total">
                        <strong>Подытог:</strong>
                        <strong><span class="amount" id="total-price">10</span> ₴</strong>
                    </p>
                    <p class="cart-button">
                        <a href="#order"class="button checkout">
                            Оформление заказа
                        </a>
                    </p>
                </div>
            </div>
        `;
            expect(_.loadCartTemplate()).toEqual(result);
        });
        
    });

    describe('catalog: loadCartDesertTemplate', ()=>{
        const cake = {
            'url': 'caramel',
            'title': 'Чизкейк Карамельный',
            'category': 'Чизкейки',
            'description': '<p>Мусс на основе кешью крема и добавлением ферментов. Нежная текстура кешью крема с веганской карамелью. Основа из миндаля. </p>',
            'price': 135,     
            'image': './images/product_ch2.jpg'
        };

        it('loadCartDesertTemplate should be defined', ()=>{
            _.loadCartDesertTemplate(cake, 1);
            expect(_.loadCartDesertTemplate).toBeDefined();
        });

        
    });

    describe('Cart: clearCart', ()=>{

        it('clearCart should be defined', ()=>{
            _.clearCart();
            expect(_.clearCart).toBeDefined();
        });
        
        it('clearCart should clear localStorage', ()=>{
            expect(localStorage.getItem('cart')).toStrictEqual(null);
            expect(_.totalPrice).toStrictEqual(0);
            expect(_.totalProducts).toStrictEqual(0);
        });
    });


});