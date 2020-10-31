import React, { useState } from 'react';
import MessageBox from "./Message"

function OldChat(props) {

    // Current message being written
    const [oldMessages, setOldMessages] = useState()
    const [isloaded, setload] = useState(false)

    const LoadOldMessages = async () => {
        await fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/GetMessages')
            .then(response => response.json())
            .then(data => {
                // Sort the data
                // console.log(data["Items"].slice(0, 20));
                setOldMessages(data)
            })
    }

    if (!isloaded) {
        LoadOldMessages()
        setload(true)
    }

    if (oldMessages) {
        return (
            oldMessages["Items"].map((item, index) => {
                // To dynamically update Cliq names requires a fetch for each different person
                // So I have just stored the name at the time of message sent.
                // console.log("Old ", item)
                return < MessageBox
                    currentUser={props.currentuser}
                    currentemail={props.currentemail}
                    YourCliq={item.Name}
                    email={item.useremail}
                    key={index}
                    name={item.displayname}
                    message={item.Message}
                    code={item.Code}
                />
            })
        )
    } else { return <h1>Loading...</h1> }
}

export default OldChat