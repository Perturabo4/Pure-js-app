export class Question {
    static create(question) {
       return fetch('https://pure-js-app.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
        .then( response => response.json())
        .then( response => {
            console.log(response);
            return response;
        })
    }
}