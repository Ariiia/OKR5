/* eslint-env jest */
import {loadContent, changePage} from '../script.js';
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

describe('loadContent', ()=>{
    beforeEach(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        Product.mockClear();
        console.error = jest.fn();
    });

    it('loadContent defined', ()=>{
        loadContent('test',null);
        expect(loadContent).toBeDefined();
    });

    it('should process hash == null and route exist', ()=>{
        expect(loadContent('product')).toBeTruthy();
    });

    it('should process hash == null and route DO NOT exist', ()=>{
        expect(loadContent('test')).toBeFalsy();
    });

    it('should process hash and route exist', ()=>{
        expect(loadContent('product', 'caramel')).toBeTruthy();
    });

    it('should process hash DO NOT EXIST and route exist', ()=>{
        expect(loadContent('product', 'test')).toBeFalsy();
    });
});

describe('changePage', ()=>{
    it('should process without subLocation / case loadContent -> true ', ()=>{
        history.pushState(null, null, '#test');

        const loadHome = Home.prototype.loadHome = jest.fn();
        loadHome.mockClear();
        // eslint-disable-next-line no-unused-vars
        const loadContent = jest.fn((hash)=>{
            return true;
        });
        loadContent.mockClear();

        changePage();
        expect(loadContent).not.toHaveBeenCalled();
        expect(loadContent()).toBeTruthy();
        expect(loadHome).toHaveBeenCalledTimes(1);
    });

    it('should process without subLocation / case loadContent -> false ', ()=>{
        history.pushState(null, null, '#test');

        const loadHome = Home.prototype.loadHome = jest.fn();
        loadHome.mockClear();
        // eslint-disable-next-line no-unused-vars
        const loadContent = jest.fn((hash)=>{
            return false;
        });
           
        loadContent.mockClear();

        changePage();
        expect(loadContent).not.toHaveBeenCalled();
        expect(loadContent()).toBeFalsy();
        expect(loadHome).toHaveBeenCalledTimes(1);
    });

    it('should process with subLocation / case loadContent -> true ', ()=>{
        history.pushState(null, null, '#test/test');

        const loadHome = Home.prototype.loadHome = jest.fn();
        loadHome.mockClear();
        // eslint-disable-next-line no-unused-vars
        const loadContent = jest.fn((hash)=>{
            return true;
        });
        loadContent.mockClear();

        changePage();
        expect(loadContent).not.toHaveBeenCalled();
        expect(loadContent()).toBeTruthy();
        expect(loadHome).toHaveBeenCalledTimes(1);
    });

    it('should process with subLocation / case loadContent -> false ', ()=>{
        history.pushState(null, null, '#test/test');

        const loadHome = Home.prototype.loadHome = jest.fn();
        loadHome.mockClear();
        // eslint-disable-next-line no-unused-vars
        const loadContent = jest.fn((hash)=>{
            return false;
        });
           
        loadContent.mockClear();

        changePage();
        expect(loadContent).not.toHaveBeenCalled();
        expect(loadContent()).toBeFalsy();
        expect(loadHome).toHaveBeenCalledTimes(1);
    });

    it('should process with length > 3', ()=>{
        history.pushState(null, null, '#test/test/test');

        const loadHome = Home.prototype.loadHome = jest.fn();
        loadHome.mockClear();

        changePage();

        expect(loadHome).toHaveBeenCalledTimes(1);
    });
});