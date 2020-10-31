import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateCliq from "./CreateCliq"

function User(props) {

    const [Cliqueinfo, setClique] = useState()
    const [localloginstate, setlocalloginState] = useState({ SignInEmail: '', EnteredPrivateCode: '' })
    const [popupopen, openorclosepopup] = useState(false)

    const createCliq = () => {
        openorclosepopup(!popupopen)
    }

    useEffect(() => {
        // Once this works we update the info in the main app to render chat
        if (Cliqueinfo) {
            props.UpdateApp(Cliqueinfo, localloginstate)
        }
    })

    // Local text field so app only renders on form submit
    const onTextChange = e => {
        setlocalloginState({ ...localloginstate, [e.target.name]: e.target.value })
    }

    // Sign in
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (localloginstate.EnteredPrivateCode === '' || localloginstate.SignInEmail === '') {
            alert("Please Enter Something")
        } else {
            LoadConnections(localloginstate.EnteredPrivateCode).then(data => {
                setClique(data['Item'])
            })
        }

    }
    // Signing In
    async function LoadConnections(thekey) {
        const data = { 'body': { "key": thekey.toString() } }
        const response = await fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/GetCliqueInfo',
            {
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
        return response.json()
    }

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
        <div className="signin-component">
            {!popupopen ?

                <div className="card signin-panel">
                    <div >
                        <div>
                            <img className='centerthis' style={{ width: '300px' }} src={require("./iconsfinal/Cliq2.png")} alt="Merge Icon" />
                        </div>
                        {/* <h3 className='centerthis'>Your friends are waiting for you!</h3> */}
                        {/* <hr /> */}
                        <form method="post" className="User-From" onSubmit={handleLoginSubmit}>

                            <TextField
                                id="input-with-icon-textfield"
                                name="EnteredPrivateCode"
                                className={classes.root}
                                // type='number'
                                min="0"
                                onChange={onTextChange}
                                value={setlocalloginState.EnteredPrivateCode}
                                label={"Private Code"}
                                // color="secondary"
                                // variant="filled"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                id="input-with-icon-textfield"
                                name="SignInEmail"
                                className={classes.root}
                                onChange={onTextChange}
                                value={setlocalloginState.SignInEmail}
                                label={"Email"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className='center-button'>
                                <button style={{ visibility: 'hidden' }} className='log-in-button' type="submit" value="Submit">CLIQ</button>
                                <p>Or, <span onClick={createCliq} className="makeBlue">Create Scene</span></p>
                            </div>
                        </form>


                    </div>
                </div>
                :

                <CreateCliq
                    toggle={createCliq} />

            }
        </div >
    );

}

export default User;