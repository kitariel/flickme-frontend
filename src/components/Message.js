import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({msg: { username, message, time}, name}) => {
    let currentUser = false;
    let admin = false;

    // gi butangan lang nako ug slice kay sa local if mag manual search sa chatroom kay makasud gihapon bisag 
    // lapas sa max character sa name
    // sa URL if sa local nya if lapas ang max char kay makita gyapon sa URL pero naka slice na sya sa chatwindow
    const trimmedName = name.trim().toLowerCase().slice(0, 10);

    if(username === trimmedName) {
        currentUser = true;
    }

    if(username === 'Admin') {
        admin = true;
    }

    return (
        <div className={ admin ? 'msg_con admin' : 'msg_con' }>
            <div className={ currentUser ? 'msg_box current' : 'msg_box' }>
                <small>{ currentUser ? trimmedName : username }</small>
                <div className="msg">
                    <p>{ReactEmoji.emojify(message)}</p>
                </div>
                <span>{time}</span>
            </div>
        </div>
    )
}

export default Message
