/* eslint-env jest */
/*global global:true*/
/*eslint no-undef: "error"*/
import {sendRequest, getDB} from '../mainDB';

describe('mainDB', ()=>{

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ some: { ex: 1 } }),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
        console.error = jest.fn();
    });

    it('sendRequest should be defined', ()=>{
        sendRequest('GET', 'test_url');
        expect(sendRequest).toBeDefined();
    });

   
    it('getDB should be defined', ()=>{
        getDB('test_url');
        expect(getDB).toBeDefined();
    });
});

