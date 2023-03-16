let addCommentBtn = document.querySelector('#comment-add');
addCommentBtn.addEventListener('keypress', (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) { // Клавиша Enter
        console.log('enter');
        addComment();
    }
});

addCommentBtn.addEventListener('click', addComment);

let comments = [];
loadComments();

function addComment() {
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentText = document.getElementById('comment-text');
    let commentDate = document.getElementById('comment-date');


    let todayDate = timeConverter(Math.floor(Date.now()/1000));
    let userDate = Number(commentDate.value.split('').reverse().splice(0, 2).reverse().join(''));

    let actualDate = '';
    let actualTime = getHoursAndMinutes(Math.floor(Date.now()/1000))
    if(userDate === todayDate) {
        actualDate = 'сегодня, ' + ' ' + actualTime
    } else if (userDate ===  todayDate-1 ) {
        actualDate = 'вчера, ' + ' ' + actualTime
    } else if (!userDate) {
        actualDate = timeConverterToday(Math.floor(Date.now()/1000)) + ', ' + actualTime;
    } else {
        actualDate = commentDate.value + ', ' + actualTime;

    }

    let comment = {
        id: Math.random(),
        name: commentName.value,
        text: commentText.value,
        date: actualDate,
    }

    if(commentText.value.length < 10) {
        checkLength(commentText);
    } else {
        comments.push(comment);
        saveCommentsToLS();
        setCommentsFromLS();
    }
}


function saveCommentsToLS(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments'))
        comments = JSON.parse(localStorage.getItem('comments'));

    setCommentsFromLS();
}

function setCommentsFromLS(){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.map( item => {
        out += `<div class="result-field">
                        <p>Дата: ${item.date}</p>
                        <p>Имя: ${item.name}</p>
                        <p>Комментарий: ${item.text}</p>
                        <button class="comment-bin" id="comment-delete" onClick="removeComment(${item.id})">
                        <img class="bin-png" src="asserts/bin.png" alt="bin svg"/>
                        </button>
                        <button class="comment-like" id="comment-like" onClick="like()">
                        <img class="like-png" src="asserts/like.png" alt="like svg"/>
                        </button>
                </div>`
    });

    commentField.innerHTML = out;
}

function removeComment(id) {
    let retrievedComments = comments.filter(item => item.id !== id);
    localStorage.setItem('comments', JSON.stringify(retrievedComments))
    loadComments();
}



function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    return a.getDate();
}

function timeConverterToday(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['01', '02' , '03','04','05','06','07','08','09','10','11','12'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let year = a.getFullYear();
    return date + '-' + month + '-' + year;
}

function getHoursAndMinutes(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    let min = a.getMinutes();
    return hour + ':' + min;
}

function like() {
    alert('спасибо за лайк!')
}

//Show input error messages
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

//check input Length
function checkLength(input) {
    showError(input, `Введите минимум ${10} символов`);
}






