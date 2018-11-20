
// { id: "fulan", name: "Fulan", photo: "https://facebook.github.io/react/img/logo.svg", lastChat: { … } }
// date: "2018-11-20T00:09:36.975Z"
// isSelf: false
// text: "halo"

// let messages = [
//     {
//         id: "fulan", 
//         name: "Fulan", 
//         photo: "https://facebook.github.io/react/img/logo.svg", 
//         lastChat: {
//             date: "2018-11-20T00:09:36.975Z",
//             isSelf: false,
//             text: "halo"
//         }
//     }
// ]

export function getMessages(){
    let messages = localStorage.getItem('messages');
    messages = (messages == null) ? [] : JSON.parse(messages);

    return messages;
}

export function newMessage(message) {
    let messageTable = getMessages();
    messageTable.push(message);
    localStorage.setItem("messages",JSON.stringify(messageTable))
}

export function setLastChat(id,chat) {
    let messages = getMessages();

    let message = null;
    for (let i = 0; i < messages.length; i++) {
        if(messages[i].id == id){
            message = messages[i];
            messages.splice(i,1);
        }
    }

    console.log(messages);
    console.log(message)

    if(message !== null){
     message.lastChat = chat;
     messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages))
    }else{
        newMessage({
            id: id,
            lastChat: chat,
            name: id,
            photo: "https://facebook.github.io/react/img/logo.svg"
        })
    }
}
