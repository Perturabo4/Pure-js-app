export class Question {
    static create(question) {
        fetch('https://pure-js-app.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
        .then( response => response.json())
        .then( response => console.log(response))
    }
}