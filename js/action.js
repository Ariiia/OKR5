import {getDB} from "./mainDB.js"

export default class Action {
    constructor(){
        this.hash = "action";
        
    }

    loadPage(subHash){
        if (subHash == null){
            return false;
        }
        else {
            this.loadAction(subHash);
        }
        return true;
    }
    
    async loadAction(subHash){
        const page = document.getElementById("page-content");

        let actions = await getDB('https://my-json-server.typicode.com/Ariiia/OKR4/actions');
        let action = actions.filter(action => {
            return action.url === subHash;
        }); 
        action = action[0];

        page.innerHTML = `
            <div class="actions">
                <p class="action-top">Страница акции</p>
                <div class="act-container">
                    <div class="act-img">
                        <img src='${action.image}'>
                    </div>
                    <div class="post-content">
                        <p class="act-date">До ${action.date}</p>
                        <p class="act-name">${action.title}</p>
                       
                        <p class="act-description">${action.description}</p>
                    </div>
                </div>
            </div>
        `
    }
}