import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InviteComponent from './InviteComponent';
import PeopleIcon from '@material-ui/icons/People';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';

function CreateCliq(props) {

    const [inputNum, setNum] = useState(3)
    const [invitees, setinvitees] = useState({ Names: {}, Emails: {} })
    const [genPrivateKey, generatePrivate] = useState()
    const [genPublicKey, generatePublic] = useState()

    useEffect(() => {
        generatePrivate(makeid(10))
        generatePublic(makeid(10))
    }, [])

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result
    }

    const handleinput = e => {
        setNum(e.target.value)
    }

    const updateInvitees = e => {
        setinvitees({ ...invitees, [e.target.name]: e.target.value })
    }

    const updateNameDict = e => {
        let SettingName = { ...invitees }
        SettingName.Names = ({ ...SettingName.Names, [e.target.name]: e.target.value })
        setinvitees(SettingName)
    }

    const updateEmailDict = e => {
        let SettingEmail = { ...invitees }
        SettingEmail.Emails = ({ ...SettingEmail.Emails, [e.target.name]: e.target.value })
        setinvitees(SettingEmail)
    }

    const makeCliq = () => {
        // Add keys and Size
        if (invitees.Name === '' || invitees.Name === null) {
            alert('Please add a name')
            return
        }

        let mainDict = { ...invitees }
        mainDict = { ...mainDict, 'InviteNum': inputNum, 'Private Key': genPrivateKey.toString(), 'Public Key': genPublicKey.toString() }
        // 
        let Members = {}


        // Check if any fields are blank otherwise weird things !!!!!
        // if (inputNum != null) {
        for (let i = 0; i < inputNum; i++) {
            let nameUser = mainDict['Names'][i.toString()]
            let emailUser = mainDict['Emails'][i.toString()]

            Members = ({
                ...Members, [emailUser.toString()]: nameUser
            })
        }
        // }
        // console.log("Zipped Members: ", Members)
        // Add Zipped Members

        mainDict = { ...mainDict, 'Members': Members, 'Connection Keys': [], 'Connection Requests': [] }
        delete mainDict["Names"];
        delete mainDict["Emails"];
        delete mainDict["InviteNum"];

        // Show/hide make Cliq popup
        props.toggle()
        // Post data to AWS to create table entry.
        makeCliqAWS(mainDict).then((data) => {
        })
    }

    const decrementCount = () => {
        let num = inputNum
        num = num - 1
        setNum(num)
    }

    async function makeCliqAWS(mainDict) {
        const data = mainDict
        const response = await fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/CreateNewCliq',
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

    let emails = []
    for (let i = 0; i < inputNum; i++) {
        emails.push(<InviteComponent
            key={'Invitee-Component-Key-' + i}
            id={i}
            updateNameDict={updateNameDict}
            updateEmailDict={updateEmailDict}
            invitees={invitees}
            decrementCount={decrementCount}
        />
        )
    }

    // Styling for Material UI Icons
    const useStyles = makeStyles((theme) => ({
        setInputStyle: {
            color: '#ffffff',
            fontSize: 25
        },
        root: {
            // background: "#ffffff",
            margin: theme.spacing(1),
            color: 'white',
            '& label.Mui-focused': {
                color: 'rgb(255, 167, 0)',
            },
            '& .MuiFormLabel-root': {
                color: 'rgb(33, 33, 33)',
            },
            '& .MuiInput-underline': {
                borderBottomColor: 'white',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'rgb(255, 167, 0)',
            },
            '& .MuiSvgIcon-root': {
                color: 'rgb(33, 33, 33)',
                opacity: '80%'
            },
            '& .MuiInputBase-input': {
                color: 'white'
            }
        }
    }));

    const classes = useStyles();

    return (
        <div className='Method-Card'>
            <div className='top-level'>
                <div >
                    {genPrivateKey ?
                        <div>
                            <h2 className='orange'>Private: </h2>
                            <h2 >{genPrivateKey}</h2>
                        </div>
                        : null
                    }
                </div>
                <div>
                    {genPublicKey ?
                        <div>
                            <h2 className='orange'>Public: </h2>
                            <h2 >{genPublicKey}</h2>
                        </div>

                        : null
                    }
                </div>
            </div>

            <div className='TheCliqName'>
                <TextField
                    className={classes.root}
                    id="CliqNameInput"
                    name="Name"
                    // min="0"
                    fullWidth
                    onChange={updateInvitees}
                    value={invitees.CliqName}
                    label={"Cliq Name"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PeopleIcon />
                            </InputAdornment>
                        ),
                    }}
                />

            </div>

            <div className='mid-level'>

                <h2 className='opacity'>Invite </h2>
                <div className='around-input-number'>
                    <input id="cliqsize" type="number" onChange={handleinput} value={inputNum} name="cliqinput"></input>
                </div>
                <h2 className='opacity'>by email</h2>
            </div>


            <div className='add-users-to-cliq'>
                {emails}
            </div>

            <div className='bottom-level'>
                <button onClick={props.toggle} className='button-left'>Back</button>
                <button onClick={makeCliq} className='button-right' type='submit'>Go</button>
            </div>

        </div>
    )
}

export default CreateCliq