import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {
    let [nameLength, setUsernameLength] = useState(7);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('JavaScript');
    const joinRef = useRef(null);

    // const { socket } = props

    useEffect(() => {
        joinRef.current.focus();
    }, []);

    const handleChange = e => {
        let len = e.target.value.length;
        if ( len === 0 ) {
            setUsernameLength(7)
            setUsername(e.target.value)
        } else if ( len > 7 ) {
            return false
        } else {
            setUsernameLength(7 - len)
            setUsername(e.target.value)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()

        let isLoggedIn = false;

        if (!username) { return false }
        
        isLoggedIn = true;

        let newUser = {
            username: username || localStorage.getItem('username'),
            room: room || localStorage.getItem('room'),
            // isLoggedIn: isLoggedIn || localStorage.getItem('isLoggedIn'),
            // date: new Date().toISOString()
            isOnline: false
        }

        try {
            const result = axios.post('http://localhost:7575/createUsers', newUser)
                .then( res => {
                    if ( res.data [0].isAccess ) {
                        // globalDispatch({ type: "username", value: user });
                        // globalDispatch({ type: "chatRoom", value: room });
                        // globalDispatch({ type: "isOnline", value: false });
                        localStorage.setItem('username', res.data.username)
                        localStorage.setItem('room', res.data.room)
                        localStorage.setItem('isOnline', false)
                        
                        props.history.push("/login");
                    } else {
                        setError("already exist / try a new one");
                        alert("user exist!!!");
                    }
                })
            // console.log(`added to db: ${result}`)

            // localStorage.setItem('username', username)
            // localStorage.setItem('room', room)
            // localStorage.setItem('isLoggedIn', isLoggedIn)
            
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="chat_home">
            <form onSubmit={handleLogin}>
                <span>{nameLength}/7</span>
                <p>{ error }</p>
                <input 
                    type="text"
                    value={username}
                    autoFocus={true} 
                    ref={joinRef} 
                    placeholder="Your Name..." 
                    onChange={e => handleChange(e)}
                />
                <select onChange={e => setRoom(e.target.value)} value={room}>
                    <optgroup label="Select room">
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="PHP">PHP</option>
                        <option value="C#">C#</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Java">Java</option>
                    </optgroup>
                </select>
                <button type="submit" className="signin">Join Chat</button>
            </form>
        </div>
    )
}
 
export default withRouter(Home);