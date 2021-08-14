const URL_POST = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes'
const URL_Servidor = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let myQuizz = {
	title: "",
	image: "",
	questions: [],
	levels: []
}

const mainScreen = document.querySelector('main');
const nameScreen = document.querySelector('.name-screen');
const questionScreen = document.querySelector('.question-screen');
const scoreScreen = document.querySelector('.score-screen');
const finalScreen = document.querySelector('.final-quizz-screen');
const conteiner = document.querySelector(".conteiner-quiz");

let numberOfQuestions;
let numberOfScores;
let quizz = [];

function showCreateQuizzScreen() {
    mainScreen.classList.toggle('hidden');
    nameScreen.classList.toggle('hidden');
}

function showCreateQuestionsScreen() {
    myQuizz.title = nameScreen.querySelector('.my-quizz-title').value;
    myQuizz.image = nameScreen.querySelector('.my-quizz-URL-photo').value;
    numberOfQuestions = Number(nameScreen.querySelector('.number-of-questions').value);
    numberOfScores = Number(nameScreen.querySelector('.number-of-scores').value);

    if((myQuizz.title.length >= 20 && myQuizz.title.length <= 65) && isTrueUrl(myQuizz.image) && numberOfQuestions >= 3 && numberOfScores >= 2){
        nameScreen.classList.toggle('hidden');
        questionScreen.classList.toggle('hidden');

        createQuestionsBoxes();
    } else {
        alert('Favor preencher os campos corretamente.')
    }
}

function createQuestionsBoxes() {
    let respostasIncorretas = '';
    questionScreen.querySelector('ul').innerHTML = '';
    
    for (let i = 0; i < numberOfQuestions; i++) {
        questionScreen.querySelector('ul').innerHTML += `
        <li class="question-creation-box">
            <div class="conteiner-questions">
                <p class="paragraph-screens-creation">Pergunta ${i + 1}</p>
                <img src="assets/Vector.svg" onclick="showInputs(this, questionScreen, numberOfQuestions)">
            </div>

            <div class="questions-inputs hidden">
                <input class="input-title-text inputs-screens-creation" placeholder="Texto da pergunta">
                <input class="color-question inputs-screens-creation" placeholder="Cor de fundo da pergunta">
            
                <p class="paragraph-screens-creation">Resposta correta</p>
                <input class="answer-question-${i} inputs-screens-creation" placeholder="Resposta correta">
                <input class="question-photo inputs-screens-creation" placeholder="URL da imagem">

                <p class="paragraph-screens-creation">Respostas incorretas</p>

                <div class="double-inputs">
                    <input class="answer-question-${i} inputs-screens-creation" placeholder="Resposta incorreta 1">
                    <input class="question-photo inputs-screens-creation" placeholder="URL da imagem 1">
                </div>

                <div class="double-inputs">
                    <input class="answer-question-${i} inputs-screens-creation" placeholder="Resposta incorreta 2">
                    <input class="question-photo inputs-screens-creation" placeholder="URL da imagem 2">
                </div>

                <div class="double-inputs">
                    <input class="answer-question-${i} inputs-screens-creation" placeholder="Resposta incorreta 3">
                    <input class="question-photo inputs-screens-creation" placeholder="URL da imagem 3">
                </div>
            </div>
        </li>`;

        createPostObject(i);
    }
}

function createPostObject(i){
    let isTrue = false;

    if(i === 0){
        isTrue = true;
    }

    myQuizz.questions.push({
        title: '', 
        color: '', 
        answers: {
            text: '',
            image: '',
            isCorrectAnswer: isTrue
        }
    });
}

function showCreateScoreScreen() {
    if(/*isTrueStringsQuestion(numberOfQuestions) && isTrueColor(numberOfQuestions) && isTextBoxesEmpty(numberOfQuestions) && isAllURL()*/true){
        questionScreen.classList.toggle('hidden');
        scoreScreen.classList.toggle('hidden');

        createScoreBoxes();
    } else {
        alert('Favor preencher os campos corretamente.')
    }
}

function isTrueStringsQuestion(numberOfThis){
    let allTexts = questionScreen.querySelectorAll('.input-title-text');
    let j = 0;

    for(let i = 0; i < numberOfThis; i ++){
        myQuizz.questions[i].title = allTexts[i].value;

        if(myQuizz.questions[i].title.length >= 20){
            j++;
        }
    }

    if(j === numberOfThis){
        return true;
    } else {
        return false;
    }
}

function isTrueColor(numberOfThis){
    let allColorText = questionScreen.querySelectorAll('.color-question');
    
    let isTrue = 0;
    for(let i = 0; i < numberOfThis; i++){
        let leters = allColorText[i].value.slice(1);

        let j = 0;
        for(let k = 0; k < leters.length; k++){
            if((leters.charCodeAt(k) >= 48 && leters.charCodeAt(k) <= 57) || (leters.charCodeAt(k) >= 65 && leters.charCodeAt(k) <= 90) || (leters.charCodeAt(k) >= 97 && leters.charCodeAt(k) <= 122)){
                j++;
            }
        }

        if(allColorText[i].value.charAt(0) === '#' && j === 6){
            isTrue++;
        }
    }

    if(isTrue === numberOfThis){
        return true;
    } else {
        return false;
    }
}

function isTrueUrl(URL){
    const rule = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    return rule.test(URL)
}

function isTextBoxesEmpty(numberOfThis){
    for(let i=0; i<numberOfThis; i++){
        let allTextBoxes = questionScreen.querySelectorAll(`.answer-question-${i}`);

        for(let j=0; j<2; j++){
            if(allTextBoxes[j].value === ''){
                return false;
            }
        }
    }

    return true
}

function isAllURL (){
    const inputs = questionScreen.querySelectorAll('.question-photo');
    const URLs = [];

    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value !== ''){
            URLs.push(inputs[i].value);
        }
    }

    for(let i = 0; i < URLs.length; i++){
        if(!isTrueUrl(URLs[i])){
            return false;
        }
    }

    return true;
}

function createScoreBoxes() {
    scoreScreen.querySelector('ul').innerHTML = '';

    for (let i = 0; i < numberOfScores; i++) {
        scoreScreen.querySelector('ul').innerHTML += `
        <li class="question-creation-box">
            <div class="conteiner-questions">
                <p class="paragraph-screens-creation">Nível ${i + 1}</p>
                <img src="assets/Vector.svg" onclick="showInputs(this, scoreScreen, numberOfScores)">
            </div>

            <div class="questions-inputs hidden">
                <input class="score-title inputs-screens-creation" placeholder="Título do nível">
                <input class="score-percent inputs-screens-creation" placeholder="% de acerto mínima">
                <input class="URL-score-screen inputs-screens-creation" placeholder="URL da imagem do nível">
                <input class="inputs-screens-creation score-description" placeholder="Descrição do nível">
            </div>
        </li>`;
    }
}

function showFinalScreen() {
    if(isTitleOk() && isPercentOk() && isAllURLScore() && isScoreDescriptionOk()){
        scoreScreen.classList.toggle('hidden');
        finalScreen.classList.toggle('hidden');

        createFinalScreen();
    } else {
        alert('Favor preencher os campos corretamente.')
    }
}

function isTitleOk(){
    let scoreTitles = scoreScreen.querySelectorAll('.score-title');

    for(let i = 0; i < scoreTitles.length; i++){
        if(scoreTitles[i].value.length < 10 || scoreTitles[i].value === ''){
            return false
        }
    }
    return true;
}

function isPercentOk(){
    let percentScores = scoreScreen.querySelectorAll('.score-percent');

    for(let i = 0; i < percentScores.length; i++){
        if(percentScores[i].value < 0 || percentScores[i].value > 100 || percentScores[i].value === ''){
            return false
        }
    }
    return true;
}

function isAllURLScore(){
    let scoreURL = scoreScreen.querySelectorAll('.URL-score-screen');

    for(let i = 0; i < scoreURL.length; i++){
        if(!isTrueUrl(scoreURL[i].value)){
            return false
        }
    }
    return true;
}

function isScoreDescriptionOk(){
    let scoreDescriptions = scoreScreen.querySelectorAll('.score-description');

    for(let i = 0; i < scoreDescriptions.length; i++){
        if(scoreDescriptions[i].value.length < 30 || scoreDescriptions[i].value === ''){
            return false
        }
    }
    return true;
}

function createFinalScreen() {
    finalScreen.innerHTML = `
    <div class="final-image" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${myQuizz.image});">
        <p>${myQuizz.title}</p>
    </div>
    <button class="button-next">Acessar Quizz</button>
    <button class="button-return" onclick="returnHomePage();">Voltar pra home</button>`
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
        if (i % 3 == 2) {
            conteiner.innerHTML += `
        <div class="quiz no-margin-right" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${quizz[i].image});">
            <p>${quizz[i].title}</p>
        </div>`;
        } else {
            conteiner.innerHTML += `
        <div class="quiz" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${quizz[i].image});">
            <p>${quizz[i].title}</p>
        </div>`;
        }
    }
}

function showInputs(element, thisScreen, numberOfThis){
    let icons = thisScreen.querySelectorAll('img')
    let questionBoxes = thisScreen.querySelectorAll('.questions-inputs');

    for(let i = 0; i < numberOfThis; i++){
        icons[i].classList.remove('hidden');
        questionBoxes[i].classList.add('hidden');
    }

    element.parentNode.nextElementSibling.classList.remove('hidden');
    element.classList.add('hidden');
}

callQuizz();