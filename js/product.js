import {getDB} from "./mainDB.js"

export default class Product {
    constructor(){
        this.hash = "product";
        
    }

    loadPage(subHash){
        if (subHash == null){
            return false;
        }
        else {
            this.loadProduct(subHash);
        }
        return true;
    }
    
    async loadProduct(subHash){
        const page = document.getElementById("page-content");

        let products = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/products');
        let product = products.filter(product => {
            return product.url === subHash;
        }); 
        let cake = product[0];

        page.innerHTML = `
            <div class="containerp">
    
                <!-- Left Column -->
                <div class="left-column">
                    <img data-image="black" src="${cake.image}" alt="image">   
                </div>
            
            
                <!-- Right Column -->
                <div class="right-column">
            
                <!-- Product Description -->
                <div class="product-description">
                    <span>${cake.category}</span>
                    <h1>${cake.title}</h1>
                    ${cake.description}
                </div>
            
                <!-- Product Pricing -->
                <div class="product-price">
                    <span>${cake.price} ₴</span>
                    <a href="#cart/${cake.url}" class="cart-btn">В корзину</a>
                </div>
                </div>
            </div>
        `
    }
}