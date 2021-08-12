const mainScreen = document.querySelector('main');
const nameScreen = document.querySelector('.name-screen');
const questionScreen = document.querySelector('.question-screen');
const scoreScreen = document.querySelector('.score-screen');
const finalScreen = document.querySelector('.final-quizz-screen');
const URL_Servidor = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";
const conteiner = document.querySelector(".conteiner-quiz");

let quizz = [];

function showCreateQuizzScreen() {
    mainScreen.classList.toggle('hidden');
    nameScreen.classList.toggle('hidden');
}

function showCreateQuestionsScreen() {
    nameScreen.classList.toggle('hidden');
    createQuestionsBoxes();
    questionScreen.classList.toggle('hidden');
}

function createQuestionsBoxes() {
    let numberOfQuestions = Number(nameScreen.querySelector('.number-of-questions').value);
    let respostasIncorretas = '';


    questionScreen.querySelector('ul').innerHTML = '';

    let i = 0;
    while(i < 3){
        respostasIncorretas += `
            <input class="inputs-screens-creation" placeholder="Resposta incorreta ${i+1}">
            <input class="inputs-screens-creation" placeholder="URL da imagem ${i+1}">
        `
        i++;
    }

    for (i = 0; i < numberOfQuestions; i++) {
        questionScreen.querySelector('ul').innerHTML += `
        <li class="question-creation-box">
            <div class="conteiner-questions">
                <p class="paragraph-screens-creation">Pergunta ${i + 1}</p>
                <img src="assets/Vector.svg" onclick="showInputs(this)">
            </div>

            <div class="questions-inputs hidden">
                <input class="inputs-screens-creation" placeholder="Texto da pergunta">
                <input class="inputs-screens-creation" placeholder="Cor de fundo da pergunta">
            
                <p class="paragraph-screens-creation">Resposta correta</p>
                <input class="inputs-screens-creation" placeholder="Texto da pergunta">
                <input class="inputs-screens-creation" placeholder="Cor de fundo da pergunta">

                <p class="paragraph-screens-creation">Respostas incorretas</p>
                ${respostasIncorretas}
            </div>
        </li>`;
    }
}

function showCreateScoreScreen() {
    questionScreen.classList.toggle('hidden');
    scoreScreen.classList.toggle('hidden');

    createScoreBoxes();
}

function createScoreBoxes() {
    let numberOfScores = Number(nameScreen.querySelector('.number-of-scores').value);

    scoreScreen.querySelector('ul').innerHTML = '';

    for (let i = 0; i < numberOfScores; i++) {
        scoreScreen.querySelector('ul').innerHTML += `
        <li>
            <div class="conteiner-questions">
                <p>Nível ${i + 1}</p>
                <img src="assets/Vector.svg">
            </div>
        </li>`;
    }
}

function showFinalScreen() {
    scoreScreen.classList.toggle('hidden');
    finalScreen.classList.toggle('hidden');

    createFinalScreen();
}

function createFinalScreen() {
    finalScreen.querySelector('img').setAttribute('src', nameScreen.querySelector('.URL-photo').value);
}

function returnHomePage() {
    finalScreen.classList.toggle('hidden');
    mainScreen.classList.toggle('hidden');
}

function callQuizz() {
    const promise = axios.get(URL_Servidor);
    promise.then(renderQuizz);
}

function renderQuizz(element) {
    conteiner.innerHTML = "";
    quizz = element.data;
    for (let i = 0; i < quizz.length; i++) {
        conteiner.innerHTML += `
        <div class="quiz" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${quizz[i].image});">
            <p>${quizz[i].title}</p>
        </div>`;
    }
}

function showInputs(element){
    element.classList.add('hidden');
}

callQuizz();