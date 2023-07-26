const socket = io.connect('http://localhost:9000');

let username = '';
document.getElementById('join-btn').addEventListener('click', (event)=>{
    event.preventDefault();
    username = document.getElementById('username-input').value;
    if(username.trim()!==''){
        document.getElementById('main-container').style.display='none';
        document.getElementById('chat-container').style.display='flex';
    }

})

socket.on('user-joined', (id)=>{
    userJoined(id);
})

document.getElementById('send-btn').addEventListener('click', (event)=>{
    event.preventDefault;
    const data = {
        username : username,
        message : document.getElementById('message-val').value,
    }
    socket.emit('message', data); //sending message and username to io

    addMessageFn(data);
})

socket.on('message', (data)=>{
    if(username !== data.username){
        addMessageFnReceive(data);
    }
})
function addMessageFn(data){
    let msgdiv = document.createElement('div');
    msgdiv.innerText = `${data.message} . ${data.username}`;
    msgdiv.setAttribute('class','message sent');
    document.getElementById('message-container').appendChild(msgdiv);
    document.getElementById('message-val').value = '';
}

function addMessageFnReceive(data){
    let msgdiv = document.createElement('div');
    msgdiv.innerText = `${data.username} . ${data.message}`;
    msgdiv.setAttribute('class','message receive');
    document.getElementById('message-container').appendChild(msgdiv);
}

function userJoined(id){
    let socketID = id;
    let msgdiv = document.createElement('div');
    msgdiv.innerText = `new user joined with ${socketID} id`;
    msgdiv.setAttribute('class','joined');
    document.getElementById('message-container').appendChild(msgdiv);

}