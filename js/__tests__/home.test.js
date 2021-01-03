/* eslint-env jest */
import Home from '../home';

describe('Home class', ()=> {

    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new Home();
    });


    afterEach(()=>{
        _ = new Home();
    });

    describe('Home: hash', ()=>{
        it('should return hash', ()=>{
            expect(_.hash).toEqual('home');
        });
    });

    describe('Home: loadPage', ()=>{
        it('should invoke loadHome if not null', ()=>{
            const loadHome = jest.fn();
            Home.prototype.loadHome = function (){
                return loadHome();
            };

            _.loadPage('test');
            expect(loadHome).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });
    });

    describe('Home: homeProducts', ()=>{
        const cake = {
            'url': 'caramel',
            'title': 'Чизкейк Карамельный',
            'category': 'Чизкейки',
            'description': '<p>Мусс на основе кешью крема и добавлением ферментов. Нежная текстура кешью крема с веганской карамелью. Основа из миндаля. </p>',
            'price': 135,     
            'image': './images/product_ch2.jpg'
        };
        const products = [cake];

        it('should be defined', ()=>{
            _.homeProducts(products);
            expect(_.homeProducts).toBeDefined();
        });
    });

    describe('Home: movingSlider', ()=>{
        beforeAll(()=>{
            document.body.innerHTML =
                `<div class="slider middle">
            
                <div class="slides">
                    <input type="radio" name="r" id="r1" checked>
                    <input type="radio" name="r" id="r2">
                    <input type="radio" name="r" id="r3">
            
                    <div class="slide s1"><a href="#action/cake_sale"><img src="images/bg1 - Copy.jpg" alt="bg1"></a></div>
                    <div class="slide"><a href="#action/cherry_fever"><img src="images/bg_2 - Copy.jpg" alt="bg2"></a></div>
                    <div class="slide"><a href="#action/new_year"><img src="images/bg3 - Copy.jpg" alt="bg3"></a></div>

                </div>
            
                <div class="navigation">
                    <label for="r1" class="bar"></label>
                    <label for="r2" class="bar"></label>
                    <label for="r3" class="bar"></label>
                </div>
            </div>`;
        });

        it('should be defined', ()=>{
            _.movingSlider();
            expect(_.movingSlider).toBeDefined();
        });
    });
});