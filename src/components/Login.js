import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {
    let [nameLength, setUsernameLength] = useState(7);
    const [username, setUsername] = useState('');
    const joinRef = useRef(null);

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

        // let newUser = {
        //     username: username || localStorage.getItem('username')
        // }

        try {
            const result = axios.post('http://localhost:7575/login', {username})
                .then( res => {
                    // console.log(res)

                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', res.data.username)
                        localStorage.setItem('room', res.data.room)
                        // localStorage.setItem('userId', res.data.status)
        
                        props.history.push('/chat');
                    } else {
                        console.log('incorrect username')
                    }
                })
            
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="chat_home">.
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <span>{nameLength}/7</span>
                <input 
                    type="text"
                    value={username}
                    autoFocus={true} 
                    ref={joinRef} 
                    placeholder="Your Name..." 
                    onChange={e => handleChange(e)}
                />
                <button type="submit" className="signin">Join Chat</button>
            </form>
        </div>
    )
}

export default withRouter(Login)
