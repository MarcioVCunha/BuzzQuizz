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
const quizzScreen = document.querySelector(".open-quiz");
const conteinerAnswer = document.querySelector(".conteiner-answer");

let numberOfQuestions;
let numberOfScores;
let quizz = [];
let id = 0;
let oQuiz = {};
let questions = [];
let restart = {};

callQuizz();

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
                <input class="right-answer-question inputs-screens-creation" placeholder="Resposta correta">
                <input class="right-question-photo inputs-screens-creation" placeholder="URL da imagem">

                <p class="paragraph-screens-creation">Respostas incorretas</p>

                <div class="double-inputs">
                    <input class="wrong-answer-question-${i} inputs-screens-creation" placeholder="Resposta incorreta 1">
                    <input class="wrong-answer-photo-${i} inputs-screens-creation" placeholder="URL da imagem 1">
                </div>

                <div class="double-inputs">
                    <input class="wrong-answer-question-${i} inputs-screens-creation" placeholder="Resposta incorreta 2">
                    <input class="wrong-answer-photo-${i} inputs-screens-creation" placeholder="URL da imagem 2">
                </div>

                <div class="double-inputs">
                    <input class="wrong-answer-question-${i} inputs-screens-creation" placeholder="Resposta incorreta 3">
                    <input class="wrong-answer-photo-${i} inputs-screens-creation" placeholder="URL da imagem 3">
                </div>
            </div>
        </li>`;

        createPostQuestions();
    }
}

function createPostQuestions(){
    myQuizz.questions.push({
        title: '',
        color: '',
        answers: []
    });
}

function showCreateScoreScreen() {
    if(isTrueStringsQuestion() && isTrueColor() && isTextBoxesEmpty() && isAllURL() && isThereEnoughWrongAnswers()){
        questionScreen.classList.toggle('hidden');
        scoreScreen.classList.toggle('hidden');

        createMyQuizzQuestions();
        createScoreBoxes();
    } else {
        alert('Favor preencher os campos corretamente.')
    }
}

function isTrueStringsQuestion(){
    let allTexts = questionScreen.querySelectorAll('.input-title-text');
    let j = 0;

    for(let i = 0; i < numberOfQuestions; i ++){
        myQuizz.questions[i].title = allTexts[i].value;

        if(myQuizz.questions[i].title.length >= 20){
            j++;
        }
    }

    if(j === numberOfQuestions){
        return true;
    } else {
        return false;
    }
}

function isTrueColor(){
    let allColorText = questionScreen.querySelectorAll('.color-question');
    
    let isTrue = 0;
    for(let i = 0; i < numberOfQuestions; i++){
        let leters = allColorText[i].value.slice(1);

        let j = 0;
        for(let k = 0; k < leters.length; k++){
            if((leters.charCodeAt(k) >= 48 && leters.charCodeAt(k) <= 57) || (leters.charCodeAt(k) >= 65 && leters.charCodeAt(k) <= 70) || (leters.charCodeAt(k) >= 97 && leters.charCodeAt(k) <= 102)){
                j++;
            }
        }

        if(allColorText[i].value.charAt(0) === '#' && j === 6){
            isTrue++;
        }
    }

    if(isTrue === numberOfQuestions){
        return true;
    } else {
        return false;
    }
}

function isTrueUrl(URL){
    const rule = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    return rule.test(URL)
}

function isTextBoxesEmpty(){
    let rightAnswers = questionScreen.querySelectorAll('.right-answer-question');

    for(let i = 0; i < numberOfQuestions; i++){
        if(rightAnswers[i].value === ''){
            return false
        }
    }

    return true;
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

function isThereEnoughWrongAnswers(){
    for(let i = 0; i < numberOfQuestions; i++){
        let allWrongAnswers = questionScreen.querySelectorAll(`.wrong-answer-question-${i}`);

        let notEmpty = 3;
        for(let j = 0; j < allWrongAnswers.length; j++){
            if(allWrongAnswers[j].value === ''){
                notEmpty--;
            }
        }
        if(notEmpty === 0){
            return false
        }
    }

    return true;
}

function createMyQuizzQuestions(){
    let questionsTitles = questionScreen.querySelectorAll('.input-title-text');
    let questionsColors = questionScreen.querySelectorAll('.color-question');
    let questionsRightAnswers = questionScreen.querySelectorAll('.right-answer-question');
    let questionsImages = questionScreen.querySelectorAll('.right-question-photo');

    for(let i = 0; i < numberOfQuestions; i++){
        myQuizz.questions[i].title = questionsTitles[i].value;
        myQuizz.questions[i].color = questionsColors[i].value;

        creareMyQuizzAnswers(i, questionsRightAnswers, questionsImages);
    }
}

function creareMyQuizzAnswers(i, questionsRightAnswers, questionsImages){
    myQuizz.questions[i].answers.push({
        text: questionsRightAnswers[i].value,
        image: questionsImages[i].value,
        isCorrectAnswer: true
    })

    let wrongAnswers = questionScreen.querySelectorAll(`.wrong-answer-question-${i}`)
    let wrongAnswersPhoto = questionScreen.querySelectorAll(`.wrong-answer-photo-${i}`)

    for(let j = 0; j < wrongAnswers.length; j++){
        if(wrongAnswers[j].value !== ''){
            myQuizz.questions[i].answers.push({
                text: wrongAnswers[j].value,
                image: wrongAnswersPhoto[j].value,
                isCorrectAnswer: false
            })
        }
    }
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
                <input class="score-description inputs-screens-creation" placeholder="Descrição do nível">
            </div>
        </li>`;
    }
}

function showFinalScreen() {
    if(isTitleOk() && isPercentOk() && isAllURLScore() && isScoreDescriptionOk()){
        scoreScreen.classList.toggle('hidden');
        finalScreen.classList.toggle('hidden');

        createMyQuizzScores();
        postQuizz();
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
    let zero = 0;

    for(let i = 0; i < percentScores.length; i++){
        if(percentScores[i].value < 0 || percentScores[i].value > 100 || percentScores[i].value === ''){
            return false
        }

        if(Number(percentScores[i].value) === 0){
            zero++;
        }
    }

    if(zero !== 1){
        return false;
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

function createMyQuizzScores(){
    let allTitles = scoreScreen.querySelectorAll('.score-title');
    let allPercent = scoreScreen.querySelectorAll('.score-percent');
    let allImages = scoreScreen.querySelectorAll('.URL-score-screen');
    let allTexts = scoreScreen.querySelectorAll('.score-description');

    for(let i = 0; i < numberOfScores; i++){
        myQuizz.levels.push({
            title: allTitles[i].value,
            image: allImages[i].value,
            text: allTexts[i].value,
            minValue: Number(allPercent[i].value)
        })
    }
}

function postQuizz(){
    let promise = axios.post(URL_POST, myQuizz);

    promise.then(handleSucces);
    promise.catch((object) => alert('erro'));
}

function handleSucces(object){
    const idMyQuizz = object.data.id;

    let allIds = localStorage.getItem('listIDs');
    let allIdList;

    if(allIds === null){
        allIdList = [];
    } else {
        allIdList = JSON.parse(allIds);
    }

    allIdList.push(idMyQuizz);
    allIds = JSON.stringify(allIdList);

    localStorage.setItem('listIDs', allIds);
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
    promise.catch(err);
}

function renderQuizz(element) {
    restart = element;
    conteiner.innerHTML = "";
    quizz = element.data;
    for (let i = 0; i < quizz.length; i++) {
        if (i % 3 == 2) {
            conteiner.innerHTML += `
        <div id="${quizz[i].id}" class="quiz no-margin-right" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${quizz[i].image});" onclick = "openQuizz(this);">
            
            <p>${quizz[i].title}</p>
        </div>`;
        } else {
            conteiner.innerHTML += `
        <div id="${quizz[i].id}" class="quiz" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${quizz[i].image});" onclick = "openQuizz(this);">
            
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

function openQuizz (quizzClicado) {
    id = Number(quizzClicado.getAttribute("id"));
    callOneQuizz();
    mainScreen.classList.toggle('hidden');
    quizzScreen.classList.toggle('hidden');
}
  
function callOneQuizz () {
    const promise = axios.get(`${URL_Servidor}/${id}`);
    promise.then(createQuizzScreen);
    promise.catch(err);
}

function err (element) {
    if (element !== undefined){
        window.location.reload();
    }
}
  
function createQuizzScreen (element) {  
    
    oQuiz = element.data;
    questions = oQuiz.questions;
    quizzScreen.innerHTML = "";
    
    quizzScreen.innerHTML += `<div class="title-quizz" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 60%, #000000 100%), url(${oQuiz.image});">
    ${oQuiz.title}</div>`;
  
    for (let i = 0; i<questions.length; i++){
        
        quizzScreen.innerHTML += `<div class="conteiner-question i${i}">
        <div class="question" style="background-color: ${questions[i].color};">${questions[i].title}</div>
        <div class="conteiner-answer"></div></div>`;

        questions[i].answers.sort(comparador);    
        let answers = questions[i].answers;
        let conteinerAnswer = document.querySelector(".i"+ i +"> .conteiner-answer");
        conteinerAnswer.innerHTML = "";
  
        for (let j = 0; j<answers.length; j++){
            conteinerAnswer.innerHTML += `<div id="${answers[j].isCorrectAnswer}" class="answer" onclick="reply(this);">
            <img src="${answers[j].image}">
            <p>${answers[j].text}</p></div>`;
        }
    }  
}
  
function comparador() { 
return Math.random() - 0.5;
}

function reply(element) {
    if(!(element.classList.contains ("clicked") || element.classList.contains("no-clicked"))){
        alterStyle(element);
    }
    
    saveCorrect(element);
    endGame();
    let scroll = document.querySelector(".i" + qntQuestions + "> .question");
    scroll.scrollIntoView;
}

function alterStyle(element) {
    element.classList.add('clicked');
    const pai = element.parentNode.childNodes;

    for (let i = 0; i < pai.length; i++){
        if (pai[i].innerHTML !== element.innerHTML){
            pai[i].classList.add('no-clicked');
        }
    }    
}

let contAcert = 0;
function saveCorrect(element) {
    const correct = element.getAttribute('id');
    console.log (correct);
    if (correct==='true'){
        contAcert++;
    }
    console.log(contAcert)
}

let qntQuestions = 0;
function endGame(){
    qntQuestions++;
    console.log(qntQuestions);
    const percent = Math.round((contAcert/qntQuestions)*100);
    console.log (percent);
    let level = oQuiz.levels;
    let result;
    let i = 1

    if(qntQuestions === questions.length){
        for (i; i < level.length; i++){
            if (percent >= level[i-1].minValue && percent < level[i].minValue){
                result = level[i-1];
            }
        }
        quizzScreen.innerHTML += `
        <div class = "conteiner-score">
            <div class = "score-percentual">${percent}% de acerto: ${result.title}</div>
            <div class = "img-text-score">
                <img src = "${result.image}">
                <div class = "text">${result.text}</div>
            </div>
        </div>
        <button class="button-next" onclick="restartQuizz();">Reiniciar Quizz</button>
        <button class="button-return" onclick="returnHome();">Voltar pra home</button>`;// falta acrescentar os botões home e refazer quizz
    }
}

function returnHome() {
    quizzScreen.classList.toggle('hidden');
    mainScreen.classList.toggle('hidden');
    qntQuestions = 0;
    contAcert = 0;
    let quizz = [];
    let id = 0;
    let oQuiz = {};
    let questions = [];
    let restart = {};
}

function restartQuizz() {
    quizzScreen.classList.toggle('hidden');
    callOneQuizz();
    qntQuestions = 0;
    contAcert = 0;
    let quizz = [];
    let id = 0;
    let oQuiz = {};
    let questions = [];
    let restart = {};
}

function callMyQuizz() {
    
}

function renderMyQuizz() {
    
}