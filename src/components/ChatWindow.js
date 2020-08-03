import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const ChatWindow = ({messagesArray, name, setNavOpen}) => {
    return (
        <ScrollToBottom>
            <div className="chat_window" onClick={e => setNavOpen(false)}>
                { messagesArray.length > 0 ? messagesArray.map((msg, i) => {
                    return (<div key={i}>
                        <Message msg={msg} currentUserName={name} />
                    </div>)
                }) : null }
            </div>
        </ScrollToBottom>
    )
}

export default ChatWindow
