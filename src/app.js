import { Question } from './question'; 
import {isValid, createModal} from './utils';
import './styles.css';


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
    createModal('Авторизация', '<h1>TEST</h1>')
}