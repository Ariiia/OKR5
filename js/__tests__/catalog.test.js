/* eslint-env jest */

import Catalog from '../catalog';

describe('Catalog class', ()=> {
    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new Catalog();
    });

    afterEach(()=>{
        _ = new Catalog();
    });

    describe('Catalog: hash', ()=>{
        it('should return hash', ()=>{
            expect(_.hash).toEqual('catalog');
        });
    });

    describe('catalog: loadPage', ()=>{

        it('should invoke loadCatalog if not null', ()=>{
            const loadCatalog = jest.fn();
            Catalog.prototype.loadCatalog = function (){
                return loadCatalog();
            };

            _.loadPage('test');
            expect(loadCatalog).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });
    });

    describe('catalog: loadCatalog', ()=>{
        const subHash = 'Cheesecakes';

        it('loadCatalog should be defined', ()=>{
            expect(_.loadCatalog(subHash)).toBeUndefined();
        });

        
    });

    describe('catalog: loadProducts', ()=>{

        const cake = {
            'url': 'caramel',
            'title': 'Чизкейк Карамельный',
            'category': 'Чизкейки',
            'description': '<p>Мусс на основе кешью крема и добавлением ферментов. Нежная текстура кешью крема с веганской карамелью. Основа из миндаля. </p>',
            'price': 135,     
            'image': './images/product_ch2.jpg'
        };

        const products = [cake];

        it('loadProducts should be defined', ()=>{
            _.loadProducts(products);
            expect(_.loadProducts).toBeDefined();
        });
    });


});