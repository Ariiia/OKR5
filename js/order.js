import {sendRequest} from './mainDB.js';

export default class Order {
    constructor(cart){
        this.hash = 'order';

        this.cart = cart;
    }

    loadPage(subHash){
        if (subHash == null){
            this.loadValidation();
        }
        else {
            this.loadOrder(subHash);
        }
        return true;
    }
    
    loadValidation(){
        const page = document.getElementById('page-content');

        page.innerHTML = `
            <div class="validation">
                <p class="validation-top">Введение данных покупателя</p>
                <form id="valid-form">
                    <div>
                        <label for="name">Имя</label>
                        <input type="text" name="name" id="name" placeholder="Ваше имя" min="2" required>
                    </div>
                    <div>
                        <label for="surname">Фамилия</label>
                        <input type="text" name="surname" id="surname" placeholder="Вашa фамилия" min="2" required>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Ваша почта" required>
                    </div>
                    <div>
                        <label for="city">Город</label>
                        <input type="text" name="city" id="city" placeholder="Ваш город" min="2" required>
                    </div>
                    <div>
                        <label for="mobile">Номер телефона</label>
                        <input type="tel" name="mobile" id="mobile" pattern="^\\+?3?8?(0\\d{9})$" placeholder="Ваш номер телефона" minlength="10" maxlength="13" required>
                    </div>
                    <div>
                        <label for="delivery">Тип доставки</label>
                    <select name="delivery" id="delivery">
                        <option label="Курьер" value="Курьер"></option>
                        <option label="Отделение почты" value="Отделение почты"></option>
                    </select>
                    </div>
                    <div>
                        <label for="card">Номер карты</label>
                        <input type="text" name="card" id="card" pattern="(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(^4[0-9]{12}(?:[0-9]{3})?$)" minlength="16" maxlength="16" placeholder="Ваш номер карты" required>  
                    </div>
                    <div class="form-group" id="expiration-date">
                        <label for="expiration">Конец действия карты</label>       
                        <select id="select-year">                    
                            <option value="21"> 2021</option>
                            <option value="22"> 2022</option>
                            <option value="23"> 2023</option>
                            <option value="24"> 2024</option>
                            <option value="25"> 2025</option>
                            <option value="26"> 2026</option>
                        </select>
                        <select id="select-month">
                            <option value="01">Январь</option>
                            <option value="02">Февраль </option>
                            <option value="03">Март</option>
                            <option value="04">Апрель</option>
                            <option value="05">Май</option>
                            <option value="06">Июнь</option>
                            <option value="07">Июль</option>
                            <option value="08">Август</option>
                            <option value="09">Сентябрь</option>
                            <option value="10">Октябрь</option>
                            <option value="11">Ноябрь</option>
                            <option value="12">Декабрь</option>
                        </select>
                    </div>
                    <div>
                        <label for="cvv">CVV</label>
                        <input type="password" name="cvv" id="cvv" placeholder="Ваш CVV" min="000" max="999" maxlength="3" size="10" required>  
                    </div> 
                    <button type="submit">Подтвердить</button>
                    <button id="reset" type="reset">Очистить</button>
                </form>
            </div>
        `;


        let form = document.getElementById('valid-form');

        form.addEventListener('submit', e => {
            e.preventDefault();
            let expirationDate = `${form.elements.namedItem('select-month').value}/${form.elements.namedItem('select-year').value}`;

            let clientInformation = {
                name: form.elements.namedItem('name').value,
                surname: form.elements.namedItem('surname').value,
                email: form.elements.namedItem('email').value,
                city: form.elements.namedItem('city').value,
                tel: form.elements.namedItem('mobile').value,
                creditCardNumber: form.elements.namedItem('card').value,
                expiration: expirationDate,
                cvv: form.elements.namedItem('cvv').value
            };

            let clientOrder = JSON.parse(localStorage.getItem('cart'));

            let clientData = {clientInformation, clientOrder};

            sendRequest('POST', 'https://my-json-server.typicode.com/Ariiia/OKR4/orders', JSON.stringify(clientData))
                .then( data => {    
                    this.loadOrder(data.id, clientInformation);
                    
                })
                .catch((error) => {
                    console.log(error);
                    this.showError();
                });

            
        });
    }

    loadOrder(subHash, clientInformation) {
        history.pushState(null, null, '#order/' + subHash);
        const page = document.getElementById('page-content');
        page.innerHTML = `
            <p class="order-top">Мы готовим ваш заказ </p>
            <div class="order">
                <span class="head">Товар:</span>
                <div id="ordered-deserts">
                    ${this.orderedItems()}  
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
            </div>
        `;
        this.cart.clearCart();

    }

    orderedItems() {
        let clientOrder = JSON.parse(localStorage.getItem('cart'));

        let itemsInCart = [];
        clientOrder.forEach(item => {
            itemsInCart.push(item.url);
        });

        let itemsToShow = this.cart.products.filter(product => {
            return itemsInCart.includes(product.url);
        });

        let orderBody = '';

        let totalPrice = 0;

        itemsToShow.forEach(desert => {

            let amount = clientOrder.filter(itemShow => {
                return desert.url === itemShow.url;
            })[0].amount;

            orderBody += `
                <div class="item">
                    <span class="left">${desert.title}  x${amount}</span>      
                    <span></span> 
                    <span class="right">${desert.price*amount} ₴</span>          
                </div>
            `;
            totalPrice += desert.price*amount;
        });

        orderBody += `
            <div class="info-item">
                <span>Подытог:</span>
                <span></span>
                <span class="right">${totalPrice} ₴</span>   
            </div>
        `;
        return orderBody;
    }

    showError(){
        document.getElementById('page-content').innerHTML = `
        <div role="alert">
            Some problems with the data server. Sorry
        </div>
        `;
    }
}