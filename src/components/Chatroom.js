import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

import ChatWindow from './ChatWindow';
import Chatinput from './Chatinput';
import OnlineUsers from './OnlineUsers';

const Chatroom = (props) => {
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messagesArray, setMessagesArray] = useState([]);
    const [navOpen, setNavOpen] = useState(false);

    const { socket } = props

    let name = localStorage.getItem('username')
    let room = localStorage.getItem('room')
    let userId = localStorage.getItem('userId')
    let isOnline = localStorage.getItem('isOnline')
    // let isLoggedIn = localStorage.getItem('isLoggedIn')

    useEffect(() => {
        let newUser = {
            // id: userId,
            username: name,
            room,   
            id:userId,
            isOnline
        }
        socket.emit('userJoined', newUser, (error) => {
            if(error) {
                alert(error)
                props.history.push("/");
            }
        })
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessagesArray(msgs => [...msgs, message]);
        })

        socket.on('usersOnline', ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect( () => {
        socket.on('getRoomMessages', (data) => {
            // setMessagesArray([...data]);
            let result = data.length > 0 && data
                .filter( checkRoom => checkRoom.room === room )

                // .sort((a, b) => b.date - a.date)

            if (result.length > 0) {
                setMessagesArray(msgs => [...result, ...msgs]);
            }
        });
        // const result = axios.get('http://localhost:7575/messages')
        // .then( res => {
        //     console.log(res.data)
        //     let result = res.data.length > 0 && res.data
        //         .filter( checkRoom => {
        //             return checkRoom.room === room
        //         })

        //     if (result.length > 0) {
        //         setMessagesArray([...result])
        //         console.log(result)
        //     }
        // })

        // socket.emit('sendMessage', message, () => setMessage(''));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if(message) {
            
            let messageData = {
                userId,
                message,
                sender: name,
                room,
                date: new Date().toISOString()
            }

            // console.log("messageData here")
            // console.log(messageData)

            try {
                const result = axios.post('http://localhost:7575/messages', messageData)
                console.log(`added to message table: ${result}`)
    
                socket.emit('sendMessage', messageData, () => setMessage(''));
            } catch (e) {
                console.log(e);
            }
            
        }
        setMessage('')
        setNavOpen(false)
    }

    //prevent backspace sa keyboard ma exit ang app except sa textarea or input elements
    // kaso dili working sa mobile kay lain ang keycode sa backspace sa mobile, react native unta makaya guro
    // dili pa ko kamao sa react native haha
    useEffect(() => {
        let addev = window.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' || event.keyCode == 229 || event.keyCode == 8 || event.key == 229 || event.key == 8) {
                var rx = /input|select|textarea/i;
                if (!rx.test(event.target.tagName) || event.target.disabled || event.target.readOnly ) {
                    event.preventDefault();
                    return false;
                }
            }
        });
        return () => {
            window.removeEventListener('keydown', addev);
        }
    }, [addEventListener]);

    return (
        <div className="chat_page" id="test">
            <div className="chat_top_div">
                <h2>Chatyuri <small>Chat App <q>by Dan Quesada III</q></small></h2>
                <div className="chat_top_right">
                    <span>Online ({users.length})</span>
                    {/* <span>Rooms</span> */}
                    <strong onClick={() => setNavOpen(!navOpen)} className={navOpen ? 'close' : 'open'}></strong>
                </div>
            </div>
            <ChatWindow 
                messagesArray={messagesArray}
                name={name}
                setNavOpen={setNavOpen}
            />
            <Chatinput
                name={name}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                socket={socket}
            />
            <OnlineUsers room={room} users={users} navOpen={navOpen} />
        </div>
    )
}
 
export default withRouter(Chatroom);