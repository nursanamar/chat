import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import MessageList from "../MessageList";
import ChatRoom from "../ChatRoom";
import NewChat from "../NewChat";

export function MainRouter() {
   return (

           <div>
               <Route exact path="/" component={MessageList} />
           <Route path="/chat/:id" component={ChatRoom} />
               <Route path="/new" component={NewChat} />
           </div>
   )
}