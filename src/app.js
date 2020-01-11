import { Question } from './question'; 
import {isValid, createModal} from './utils';
import './styles.css';
import { getAuthForm, authWithEmailAndPassword } from './auth';


const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', (e) => {

    submitBtn.disabled = ! isValid(e.target.value);
    
});

function submitFormHandler(e) {
    e.preventDefault();

    if(isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        Question.create(question).then( res => {
            submitBtn.disabled = true;
            input.className = '';
            input.value = '';
        });
         
        console.log(question);
    }

}

function openModal() {
    createModal('Авторизация', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(e) {
    e.preventDefault();

    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
}

function renderModalAfterAuth(content) {
    console.log(content);
}