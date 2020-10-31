import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import RenderChat from "./renderchat"
import OldChat from "./OldChat"
import { makeStyles } from '@material-ui/core/styles';

import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000/')

function MidPanel(props) {
    const [signedin, signin] = useState(false)

    // _________________________________________    

    // Setting the message that get's sent and added to DynamoDb

    const [state, setState] = useState({ YourCliq: '', displayname: '', useremail: '', message: '', publickey: '', currenttime: '' })

    const CLIQ = props.CLIQ
    const INFO = props.INFO

    if (!signedin) {
        let displayname
        let useremail
        let Members = CLIQ['Members']
        let publickey = CLIQ['Public Key']
        let YOURCLIQNAME = CLIQ['Name']
        for (let email in Members) {
            if (email === INFO.SignInEmail) {
                displayname = Members[email]
                useremail = email
            }
        }
        setState({ ...state, YourCliq: YOURCLIQNAME, displayname: displayname, useremail: useremail, publickey: publickey })
        signin(true)
    }

    const onTextChange = e => {
        setState({ ...state, [e.target.name]: e.target.value, currenttime: getMessageTime() })
    }

    const handleSubmit = e => {
        e.preventDefault()
        onMessageSubmit(e)
    }

    const AddMessagetoDB = () => {
        fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/AddMessageAPI',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(state)
            })
            .then(response => response.json())
    }

    const onMessageSubmit = e => {
        const { YourCliq, displayname, useremail, message, publickey, time } = state
        if (message !== '') {
            //Emits sent message to chat.
            socket.emit('message', { YourCliq, displayname, useremail, message, publickey, time })
            // Adds the message to the database of recent messages.
            AddMessagetoDB(state)
            // Clear message
            setState({ message: '', YourCliq, displayname, useremail, publickey })
        }
    }

    // _________________________________________

    const getMessageTime = () => {
        // const timestamp = new Date().toLocaleTimeString();
        let currentdate = new Date();
        currentdate = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        return currentdate.toString()
    }

    console.log("Reload Middle")

    // Styling for Material UI Icons
    const useStyles = makeStyles((theme) => ({
        // margin: {
        //     margin: theme.spacing(1),
        // },
        setInputStyle: {
            color: '#ffffff',
            fontSize: 25
        },
        root: {

            // background: "#ffffff",
            margin: theme.spacing(1),
            color: 'white',
            '& label.Mui-focused': {
                color: 'rgb(255, 167, 0);',
            },
            '& .MuiFormLabel-root': {
                color: 'white;',
            },
            '& .MuiInput-underline': {
                borderBottomColor: 'white',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'rgb(255, 167, 0)',
            },
            '& .MuiSvgIcon-root': {
                color: 'white',
                opacity: '80%'
            },
            '& .MuiInputBase-input': {
                color: 'white'
            }
        }
    }

    ));

    const classes = useStyles();

    return (
        <section id="midSection" className="mid">
            <form className="User-From" onSubmit={handleSubmit} autoComplete="off">
                <div className="Chat-Outer-Wrap">

                    <div className="Chat-Messages">
                        <OldChat
                            YourCliq={state.YourCliq}
                            currentuser={state.displayname}
                            currentemail={state.useremail}
                        />
                        <RenderChat
                            YourCliq={state.YourCliq}
                            currentuser={state.displayname}
                            currentemail={state.useremail}
                        />
                    </div>
                </div>

                <div className="Chat-submit-message">
                    <div className="messagebox">
                        <TextField
                            fullWidth
                            className={classes.root}
                            name="message"
                            onChange={onTextChange}
                            value={state.message}
                            label={"Start Message"}
                        />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default MidPanel