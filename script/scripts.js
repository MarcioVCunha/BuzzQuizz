const mainScreen = document.querySelector('main');
const nameQuizzScreen = document.querySelector('.name-quizz-screen');
const questionQuizzScreen = document.querySelector('.create-question-screen');

function showCreateQuizzScreen(){
    mainScreen.classList.toggle('hidden');
    nameQuizzScreen.classList.toggle('hidden');
}

function showCreateQuestionsScreen(){
    nameQuizzScreen.classList.toggle('hidden');
    createQuestionsBoxes();
    questionQuizzScreen.classList.toggle('hidden');
}

function createQuestionsBoxes(){
    let numberOfQuestions = Number(nameQuizzScreen.querySelector('.number-of-questions').value);

    questionQuizzScreen.querySelector('ul').innerHTML = '';

    for(let i = 0; i < numberOfQuestions; i++){
        questionQuizzScreen.querySelector('ul').innerHTML += `
        <li>
            <div class="conteiner-questions">
                <p>Pergunta ${i+1}</p>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        </li>`;
    }
}