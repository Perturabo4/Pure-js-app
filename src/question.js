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
            question.id = response.name;
            return question;
        })
        .then(addToLocalStorage)
        .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage();  
        const html = questions.length 
            ? questions.map(toCard).join('')
            : '<div class="mui--text-headline"> No questions yet </div>';
        
        const list = document.getElementById('list');

        list.innerHTML = html;
    }

    static fetch(token) {

        if(!token) {
            return Promise.resolve('<p class="error">Вы не зарегистрированы !</p>')
        }

        fetch(`https://pure-js-app.firebaseio.com/questions.json?auth=${token}`)
            .then( res => res.json())
            .then( res => {
                if(res.error) {
                    return `<p class="">${res.error}</p>`
                }

                return response 
                    ? Object.keys(response).map( key => ({
                        ...response[key],
                        id: key
                     }))
                    : []
            })
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
    return `<div class="mui--text-black-54">
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div>
            <br>
            <div>${question.text}</div>`;
}