const mainScreen = document.querySelector('main');

function showCreateQuizzScreen(){
    let nameQuizzScreen = document.querySelector(".name-Quizz-Screen");
    
    mainScreen.classList.toggle('hidden');
    nameQuizzScreen.classList.toggle('hidden');
}