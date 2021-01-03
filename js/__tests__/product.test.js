/* eslint-env jest */
jest.mock('../mainDB');

import {getDB} from '../mainDB';
import Product from '../product';

describe('Product class', ()=> {
    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new Product();
    });

    afterEach(()=>{
        _ = new Product();
    });

    describe('Product: hash', ()=>{
        it('should return hash', ()=>{
            expect(_.hash).toEqual('product');
        });
    });

    describe('Product: loadPage', ()=>{
        it('should return false if null', ()=>{
            expect(_.loadPage(null)).toBeFalsy();
        });

        it('should invoke loadProduct if not null', ()=>{
            const loadProduct = jest.fn();
            Product.prototype.loadProduct = function (){
                return loadProduct();
            };

            _.loadPage('test');
            expect(loadProduct).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });
    });

    describe('Product: loadProduct', ()=>{
        const subHash = 'caramel';
        
        let Product_ex = {
            'url': 'caramel',
            'title': 'Чизкейк Карамельный',
            'category': 'Чизкейки',
            'description': '<p>Мусс на основе кешью крема и добавлением ферментов. Нежная текстура кешью крема с веганской карамелью. Основа из миндаля. </p>',
            'price': 135,     
            'image': './images/product_ch2.jpg'
        };

        it('loadProduct should be defined', ()=>{
            expect(_.loadProduct('caramel')).toBeUndefined(); // to be changed
        });

        it('should get Product from DB', async ()=>{

            let data = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/Products');
            let products = data.products;

            expect(products[0].url).toStrictEqual(subHash);
        });

        it('should get Product from DB', async ()=>{
            let data = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/Products');
            let products = data.products;
            let Product = products.filter(Product => {
                return Product.url === subHash;
            }); 
            Product = Product[0];

            expect(Product).toStrictEqual(Product_ex);
        });

        it('should load Product information', ()=>{

            const page = document.body;
            page.innerHTML = `
                <div class="containerp">
        
                    <!-- Left Column -->
                    <div class="left-column">
                        <img data-image="black" src="${Product_ex.image}" alt="image">   
                    </div>
                
                
                    <!-- Right Column -->
                    <div class="right-column">
                
                    <!-- Product Description -->
                    <div class="product-description">
                        <span>${Product_ex.category}</span>
                        <h1>${Product_ex.title}</h1>
                        ${Product_ex.description}
                    </div>
                
                    <!-- Product Pricing -->
                    <div class="product-price">
                        <span>${Product_ex.price} ₴</span>
                        <a href="#cart/${Product_ex.url}" class="cart-btn">В корзину</a>
                    </div>
                    </div>
                </div>
            `;

            let expected = `
                <div class="containerp">
        
                    <!-- Left Column -->
                    <div class="left-column">
                        <img data-image="black" src="./images/product_ch2.jpg" alt="image">   
                    </div>
                
                
                    <!-- Right Column -->
                    <div class="right-column">
                
                    <!-- Product Description -->
                    <div class="product-description">
                        <span>Чизкейки</span>
                        <h1>Чизкейк Карамельный</h1>
                        <p>Мусс на основе кешью крема и добавлением ферментов. Нежная текстура кешью крема с веганской карамелью. Основа из миндаля. </p>
                    </div>
                
                    <!-- Product Pricing -->
                    <div class="product-price">
                        <span>135 ₴</span>
                        <a href="#cart/caramel" class="cart-btn">В корзину</a>
                    </div>
                    </div>
                </div>
            `;

            expect(page.innerHTML).toStrictEqual(expected);
        });
    });


});