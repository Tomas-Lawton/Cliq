
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';

function InviteComponent(props) {

    const i = props.id

    let thisname = i.toString()
    let thisemail = i.toString()

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
            color: 'rgb(255, 167, 0)',
            // secondary: 'rgb(255, 167, 0)',
            '& label.Mui-focused': {
                color: 'rgb(255, 167, 0)',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'rgba(33, 33, 33, 1)',
                },
                '&:hover fieldset': {
                    borderColor: 'rgb(255, 167, 0)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'rgb(255, 167, 0)',
                },

            }
        }
    }));

    const classes = useStyles();

    const itemid = 'CliqMountedComponent' + i.toString()

    return (
        <div id={itemid} className='invite-email-element'>
            {/* <h1>{i}</h1> */}
            <TextField
                className={classes.root}
                id={"displayname-input-" + i}
                name={thisname}
                onChange={props.updateNameDict}
                value={props.invitees.Names.thisname}
                label={"DisplayName"}
                variant="outlined"
                // color="secondary"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                className={classes.root}
                id={"email-input-" + i}
                name={thisemail}
                onChange={props.updateEmailDict}
                value={props.invitees.Emails.thisemail}
                label={"Email"}
                variant="outlined"
                // color="secondary"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <div className='contain-Cross'>
                <img className='styleCross' src={require("./iconsfinal/cross.svg")} alt="Cross Icon" onClick={() => {
                    props.decrementCount()
                    document.getElementById('CliqMountedComponent' + i.toString()).style.display = 'none';
                }} />
            </div>

        </div>
    )
}
export default InviteComponent