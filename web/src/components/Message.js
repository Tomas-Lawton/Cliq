import React from 'react';

function MessageBox(props) {
    // RERENDERS A LOT MAYBE BECUASE OF SOCKETS
    // console.log("MESSAGE PROPS ", props)
    // props.code
    if (props.currentUser === props.name) {
        return (
            <div className="MessageTop MessageContainRight" key={props.index}>
                <p>You sent a message</p>
                <span className="style-Message-Left">{props.message}</span>
            </div>
        )
    } else {
        return (
            <div className="MessageTop MessageContainLeft" key={props.index}>
                <p>{props.name + " from " + props.YourCliq}</p>
                <span className="style-Message-Right">{props.message}</span>
            </div>
        )
    }
}

export default MessageBox