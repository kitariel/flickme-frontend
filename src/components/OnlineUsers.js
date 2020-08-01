import React from 'react';

const OnlineUsers = ({ users, room, navOpen }) => {
    return (
        <div className={navOpen ? 'users_div active' : 'users_div'}>
        {users ? (
            <>
                <h4>Room: {room}</h4>
                <a href="/"><button>Leave Room?</button></a>
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

export default OnlineUsers;