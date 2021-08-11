const mainScreen = document.querySelector('main');
const nameScreen = document.querySelector('.name-screen');
const questionScreen = document.querySelector('.question-screen');
const scoreScreen = document.querySelector('.score-screen');
const finalScreen = document.querySelector('.final-quizz-screen');

function showCreateQuizzScreen(){
    mainScreen.classList.toggle('hidden');
    nameScreen.classList.toggle('hidden');
}

function showCreateQuestionsScreen(){
    nameScreen.classList.toggle('hidden');
    createQuestionsBoxes();
    questionScreen.classList.toggle('hidden');
}

function createQuestionsBoxes(){
    let numberOfQuestions = Number(nameScreen.querySelector('.number-of-questions').value);

    questionScreen.querySelector('ul').innerHTML = '';

    for(let i = 0; i < numberOfQuestions; i++){
        questionScreen.querySelector('ul').innerHTML += `
        <li>
            <div class="conteiner-questions">
                <p>Pergunta ${i+1}</p>
                <img src="assets/Vector.svg">
            </div>
        </li>`;
    }
}

function showCreateScoreScreen(){
    questionScreen.classList.toggle('hidden');
    scoreScreen.classList.toggle('hidden');

    createScoreBoxes();
}

function createScoreBoxes(){
    let numberOfScores = Number(nameScreen.querySelector('.number-of-scores').value);

    scoreScreen.querySelector('ul').innerHTML = '';

    for(let i = 0; i < numberOfScores; i++){
        scoreScreen.querySelector('ul').innerHTML += `
        <li>
            <div class="conteiner-questions">
                <p>Nível ${i+1}</p>
                <img src="assets/Vector.svg">
            </div>
        </li>`;
    }
}

function showFinalScreen(){
    scoreScreen.classList.toggle('hidden');
    finalScreen.classList.toggle('hidden');

    createFinalScreen();
}

function createFinalScreen(){
    finalScreen.querySelector('img').setAttribute('src', nameScreen.querySelector('.URL-photo').value);
}

function returnHomePage(){
    finalScreen.classList.toggle('hidden');
    mainScreen.classList.toggle('hidden');
}