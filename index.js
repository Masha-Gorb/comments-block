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
    } else {
        actualDate = commentDate.value + ', ' + actualTime;
    }

    let comment = {
        id: Math.random(),
        name: commentName.value,
        text: commentText.value,
        date: actualDate,
    }

    // //check input Length
    // function checkLength(input) {
    //     if(input.value.length < 10) {
    //         showError(input, `Текст комменатрия must be at least ${10} characters`);
    //     }else if(input.value.length > 200) {
    //         showError(input, `Текст комменатрия must be les than ${200} characters`);
    //     }else {
    //         showSucces(input);
    //     }
    // }

// //show success colour
//     function showSucces(input) {
//         const formControl = input.parentElement;
//         formControl.className = 'form-control success';
//     }
// //Show input error messages
//     function showError(input, message) {
//         const formControl = input.parentElement;
//         formControl.className = 'form-control error';
//         const small = formControl.querySelector('small');
//         small.innerText = message;
//     }
//
//     checkLength(commentText.value);

    comments.push(comment);
    saveCommentsToLS();
    setCommentsFromLS();
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
        out += `<div class="test">
                        <p>Дата: ${item.date}</p>
                        <p>Имя: ${item.name}</p>
                        <p>Комментарий: ${item.text}</p>
                        <button id="comment-delete" onClick="removeComment(${item.id})">🗑</button>
                        <button id="comment-like">💖</button>
                </div>`
        // out += `<p>Имя: ${item.name}</p>`
        // out += `<p>Комментарий: ${item.text}</p>`
        // out += `<button id="comment-delete" onClick="removeComment(${item.id})">🗑</button>`
        // out += `<button id="comment-like">💖</button>`
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
    // let months = ['01', '02' , '03','04','05','06','07','08','09','10','11','12'];
    // let month = months[a.getMonth()];
    // let date = a.getDate();
    return a.getDate();
}

function getHoursAndMinutes(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    let min = a.getMinutes();
    return hour + ':' + min;
}



