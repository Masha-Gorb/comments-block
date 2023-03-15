let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function() {
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentText = document.getElementById('comment-text');
    let commentDate = document.getElementById('comment-date');

    let todayDate = timeConverter(Math.floor(Date.now()/1000));
    let userDate = Number(commentDate.value.split('').reverse().splice(0, 2).reverse().join(''));

    let actualDate = '';
    let actualTime = getHoursAndMinutes(Math.floor(Date.now()/1000))
    if(userDate === todayDate) {
        actualDate = 'сегодня, ' + 'время: ' + actualTime
    } else if (userDate ===  todayDate-1 ) {
        actualDate = 'вчера, ' + 'время: ' + actualTime
    } else {
        actualDate = commentDate.value + ', время: ' + actualTime;
    }
    
    let comment = {
        id: Math.random(),
        name: commentName.value,
        text: commentText.value,
        date: actualDate,
    }

    comments.push(comment);
    // commentName.value = '';
    // commentText.value = '';
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
        out += `<p>Дата: ${item.date}</p>`
        out += `<p>Имя: ${item.name}</p>`
        out += `<p>Комментарий: ${item.text}</p>`
        out += `<button id="comment-delete" onClick="removeComment(${item.id})">Удолить</button>`
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