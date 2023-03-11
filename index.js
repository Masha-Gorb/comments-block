let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function() {
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentText = document.getElementById('comment-text');

    let comment = {
        id: Math.random(),
        name: commentName.value,
        text: commentText.value,
        date: Math.floor(Date.now()/1000)
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
        out += `<p>Дата: ${timeConverter(item.date)}</p>`
        out += `<p>Имя: ${item.name}</p>`
        out += `<p>Комментарий: ${item.text}</p>`
        out += `<p>ID: ${item.id}</p>`
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
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}