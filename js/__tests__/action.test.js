/* eslint-env jest */
jest.mock('../mainDB');

import {getDB} from '../mainDB';
import Action from '../action';






describe('Action class', ()=> {

    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new Action();
    });


    afterEach(()=>{
        _ = new Action();
    });

    describe('Action: hash', ()=>{
        it('should return hash', ()=>{
            expect(_.hash).toEqual('action');
        });
    });

    describe('Action: loadPage', ()=>{

        it('should return false if null', ()=>{
            expect(_.loadPage(null)).toBeFalsy();
        });

        it('should invoke loadAction if not null', ()=>{
            const loadAction = jest.fn();
            Action.prototype.loadAction = function (){
                return loadAction();
            };

            _.loadPage('test');
            expect(loadAction).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });
    });

    describe('Action: loadAction', ()=>{
        const subHash = 'cherry_fever';
        
        let action_ex = {
            'url': 'cherry_fever',
            'title': 'Вишня за 90!!!',
            'image': 'images/bg_2 - Copy.jpg',
            'description': 'Не пропустите вишнёвую лихорадку! До 1 февраля заказывайте десерты с вишней по специальной супер-цене всего лишь в 90! Акция распространяется на все позиции, в названии которых есть \'вишня\'. Действует на все категории.',
            'date': '01.02.2021'   
        };

        it('loadAction should be defined', ()=>{
            _.loadAction('cherry_fever');
            expect(_.loadAction).toBeDefined(); // to be changed
        });

        it('should get action from DB', async ()=>{

            let data = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/actions');
            let actions = data.actions;

            expect(actions[0].url).toStrictEqual(subHash);
        });

        it('should get action from DB', async ()=>{
            let data = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/actions');
            let actions = data.actions;
            let action = actions.filter(action => {
                return action.url === subHash;
            }); 
            action = action[0];

            expect(action).toStrictEqual(action_ex);
        });

        it('should load action information', ()=>{

            const page = document.body;
            page.innerHTML = `
                <div class="actions">
                    <p class="action-top">Страница акции</p>
                    <div class="act-container">
                        <div class="act-img">
                            <img src='${action_ex.image}'>
                        </div>
                        <div class="post-content">
                            <p class="act-date">До ${action_ex.date}</p>
                            <p class="act-name">${action_ex.title}</p>
                        
                            <p class="act-description">${action_ex.description}</p>
                        </div>
                    </div>
                </div>
            `;

            let expected = `
                <div class="actions">
                    <p class="action-top">Страница акции</p>
                    <div class="act-container">
                        <div class="act-img">
                            <img src="images/bg_2 - Copy.jpg">
                        </div>
                        <div class="post-content">
                            <p class="act-date">До 01.02.2021</p>
                            <p class="act-name">Вишня за 90!!!</p>
                        
                            <p class="act-description">Не пропустите вишнёвую лихорадку! До 1 февраля заказывайте десерты с вишней по специальной супер-цене всего лишь в 90! Акция распространяется на все позиции, в названии которых есть 'вишня'. Действует на все категории.</p>
                        </div>
                    </div>
                </div>
            `;

            expect(page.innerHTML).toStrictEqual(expected);
        });
    });


});