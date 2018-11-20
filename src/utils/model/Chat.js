
import { setLastChat } from "./Messages";

var chats = [
    {
        id:"fulan",
        chats: [
            {
                text: "lorem",
                date: new Date(1542691507969),
                isSelf: false
            }
        ]
    }
]



export function getChats(id){
    let chats = localStorage.getItem('chats');
    chats = chats == null ? [] : JSON.parse(chats);
    
    let res = [];
    // console.log(chats)
    chats.forEach(chat => {
        if(chat.id == id){
            res = chat.chats
        }
    })

    return res;
}


export function newChat(id,chat){
    let chatTable = localStorage.getItem('chats');
    chatTable = chatTable == null ? [] : JSON.parse(chatTable);

   
        let update = [];
        for (let i = 0; i < chatTable.length; i++) {
            if(chatTable[i].id == id){
                let temp = chatTable.splice(i,1);
                update = [...temp]
            }
        }

        if(update <= 0){
            chatTable.push({
                id: id,
                chats: [chat]
            })
    // localStorage.setItem('chats',JSON.stringify(chatTable));

        }else{
            console.log(update)
            update[0].chats.push(chat);
            console.log(update)            
            chatTable.push(update[0]);
            console.log(chatTable)
        }

    localStorage.setItem('chats',JSON.stringify(chatTable));
    setLastChat(id,chat)
}