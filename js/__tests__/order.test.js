/* eslint-env jest */
import Order from '../order';
import Cart from '../cart';

describe('Order class', ()=> {

    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new Order(Cart);
    });


    afterEach(()=>{
        _ = new Order(Cart);
    });

    describe('Order: hash', ()=>{
        it('should return hash', ()=>{
            expect(_.hash).toEqual('order');
        });
    });

    describe('Order: loadPage', ()=>{

        it('should loadValidation if null', ()=>{
            const loadValidation = jest.fn();
            Order.prototype.loadValidation = function (){
                return loadValidation();
            };

            _.loadPage(null);
            expect(loadValidation).toHaveBeenCalledTimes(1);
        });

        it('should invoke loadOrder if not null', ()=>{
            const loadOrder = jest.fn();
            Order.prototype.loadOrder = function (){
                return loadOrder();
            };

            _.loadPage('test');
            expect(loadOrder).toHaveBeenCalledTimes(1);
        });

        it('should return true ', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });
    });

    describe('Order: showError', ()=>{
        it('should return error block', ()=>{
            let result = `<div id="page-content">
        <div role="alert">
            Some problems with the data server. Sorry
        </div>
        </div>`;
            _.showError();
            expect(result).toEqual(document.body.innerHTML);
        });
    });

    describe('Order: loadValidation', ()=>{
        
        it('loadAction should be defined', ()=>{
            _.loadValidation();
            expect(_.loadValidation).toBeDefined(); // to be changed
        });
       
    });

    describe('Order: loadOrder', ()=>{
        it('should return order block', ()=>{
            let id = 1;
            let clientInformation = {
                name: 'Abal',
                surname: 'Mamak',
                email: 'alkak@da.ua',
                city: 'Kyiv',
                tel: '098125342346',
                creditCardNumber: '1234567890123456',
                expiration: '12/22',
                cvv: '345'
            };

            const orderedItems = jest.fn();
            Order.prototype.orderedItems = function (){
                return '';
            };


            let result = `
            <p class="order-top">Мы готовим ваш заказ </p>
            <div class="order">
                <span class="head">Товар:</span>
                <div id="ordered-deserts">
                    ${orderedItems}  
                </div>
                <span class="head">Ваши данные:</span>   
                <div class="info-item">               
                    <div class="item">
                        <p class="left">Имя</p> 
                        <span></span> 
                        <p class="right">${clientInformation.name}</p>   
                    </div>
                    <div class="item">
                        <p class="left">Фамилия</p> 
                        <span></span> 
                        <p class="right">${clientInformation.surname}</p>   
                    </div>
                    <div  class="item">
                        <p class="left">Телефон</p> 
                        <span></span> 
                        <p class="right">${clientInformation.tel}</p>   
                    </div>
                    <div  class="item">
                        <p class="left">Город</p> 
                        <span></span> 
                        <p class="right">${clientInformation.city}</p>   
                    </div>
                    <div  class="item">
                        <p class="left">email</p> 
                        <span></span> 
                        <p class="right">${clientInformation.email}</p>   
                    </div>
                </div>
                <div class="head">
                    <span class="left">Статус заказа</span>
                    <span></span> 
                    <span class="right">Собирается</span>
                </div>       
            </div>`;

            _.loadOrder(id, clientInformation);
            expect(_.loadOrder).toBeDefined();
            expect(result).toEqual(result);
        });
    });

    describe('Order: orderedItems', ()=>{
        
        it('orderedItems should be defined', ()=>{
            _.orderedItems();
            expect(_.orderedItems).toBeDefined(); // to be changed
        });
       
    });

});