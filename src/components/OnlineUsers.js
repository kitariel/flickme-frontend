import React from 'react';
import { withRouter } from 'react-router-dom'

const OnlineUsers = ({ users, room, navOpen }) => {

    const handleLeave = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('room')
        localStorage.removeItem('isLoggedIn')

        props.history.push('/')
    }
    
    return (
        <div className={navOpen ? 'users_div active' : 'users_div'}>
        {users ? (
            <>
                <h4>Room: {room}</h4>
                <button onClick={handleLeave}>Leave Room?</button>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </>
        ) : null }
      </div>
    )
};

export default withRouter(OnlineUsers);