/* eslint-env jest */

import Home from '../home.js';
import Product from '../product.js';
import Catalog from '../catalog.js';
import Action from '../action.js';
import Cart from '../cart.js';
import Order from '../order.js';

jest.mock('../product');

describe('should define classes', ()=>{
    it('Home', ()=>{
        expect(Home).toBeDefined();
    });
    it('Product', ()=>{
        expect(Product).toBeDefined();
    });
    it('Catalog', ()=>{
        expect(Catalog).toBeDefined();
    });
    it('Action', ()=>{
        expect(Action).toBeDefined();
    });
    it('Cart', ()=>{
        expect(Cart).toBeDefined();
    });
    it('Order', ()=>{
        expect(Order).toBeDefined();
    });
});

// describe('loadContent', ()=>{
//     beforeEach(()=>{
//         Product.mockClear();
//         console.error = jest.fn();
//     });

//     it('loadContent defined', ()=>{
//         expect(loadContent()).toBeUndefined();
//     });


//     it('should process hash == null and route exist', ()=>{
//         expect(loadContent('product')).toBeTruthy();
//         expect(Product.loadPage).toHaveBeenCalledTimes(1);
//         expect(Product.loadPage).toHaveBeenCalledWith('product');
//     });

//     it('should process hash == null and route DO NOT exist', ()=>{
//         expect(loadContent('test')).toBeFalsy();
//     });

//     it('should process hash and route exist', ()=>{
//         expect(loadContent('product', 'test_url1')).toBeTruthy();
//         expect(Product.loadPage).toHaveBeenCalledTimes(1);
//         expect(Product.loadPage).toHaveBeenCalledWith('product', 'test_url1');
//     });

//     it('should process hash DO NOT EXIST and route exist', ()=>{
//         expect(loadContent('product', 'test')).toBeFalsy();
//     });
// });