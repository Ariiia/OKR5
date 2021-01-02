import {getDB} from './mainDB.js';

export default class Catalog {
    constructor(){
        this.hash = 'catalog';
        
    }

    loadPage(subHash) {
        this.loadCatalog(subHash);
        return true;
    }

    async loadCatalog(subHash) {
        const page = document.getElementById('page-content');
        
        let products = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/products');
        
        let category_title = 'сладости';

        if(subHash != null){
            if (subHash == 'Deserts'){
                products = products.filter(product => {
                    return product.category === 'Десерты';
                }); 
                category_title = 'десерты';
            } else if (subHash == 'Cakes'){
                products = products.filter(product => {
                    return product.category === 'Торты';
                }); 
                category_title = 'торты';
            } else if (subHash == 'Cheesecakes'){
                products = products.filter(product => {
                    return product.category === 'Чизкейки';
                });
                category_title = 'чизкейки';
            }
        }


        page.innerHTML = `
            <h6>Наши ${category_title}</h6>
            <div class="GRID">
                
                ${this.loadProducts(products)}
            
            </div>
        `;
    }

    loadProducts(products){
        let products_to_show_content = '';

        products.forEach(cake => {
            products_to_show_content += `
                <div class="onedes">
                    <a href="#product/${cake.url}">    
                        <img src="${cake.image}" alt="desert">
                    </a>
                    <div class="info">
                        <strong> ${cake.title}</strong>
                        ${cake.description}
                    </div>
                </div>
            `;
        });

        return products_to_show_content;
    }
}
