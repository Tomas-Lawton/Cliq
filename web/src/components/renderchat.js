import React, { useState, useEffect } from 'react';
import MessageBox from "./Message"
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000/')

function RenderChat(props) {
    // Instant Messaging uses setchat
    const [chat, setChat] = useState([])

    // Instant Messaging Via Sockets. (Socket always listening)
    // Careful of infinite renders from socket - must have array at end of effect

    useEffect(() => {
        socket.on('message', ({ YourCliq, displayname, useremail, message, publickey, time }) => {
            setChat([...chat, { YourCliq, displayname, useremail, message, publickey, time }])
        });
    });

    return (
        chat.map((item, index) => (
            < MessageBox
                currentUser={props.currentuser}
                currentemail={props.currentemail}
                email={item.useremail}
                YourCliq={item.YourCliq}
                key={index}
                name={item.displayname}
                message={item.message}
                code={item.publickey}
                time={item.time}
            />
        ))
    )
}

export default RenderChat