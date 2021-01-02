const requestURL = 'https://my-json-server.typicode.com/Ariiia/OKR4/db';

export function sendRequest(method, url, body=null) {
    return fetch(url, {method: method, body: body}).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    })
    .catch(error => {
        console.log(error);
    });
}

export function getDB(url){
    return new Promise ((resolve, reject) => {
        sendRequest('GET', url)
        .then(data => {
            resolve(data);
        })
    })
}