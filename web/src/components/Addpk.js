import React from 'react';

function Addpk(props) {
    const showorhidePKbox = (e) => {
        e.preventDefault()
        let connectionkey = document.getElementById('newpublickey').value
        let thisPrivatekey = props.thisprivate
        let thisPublickey = props.thispublic
        // Do a post request to append connected key to existing cliq 
        // Reload Cliqs: will automatically get private keys and return the cliq info

        // Then do a post request to get their private key and then add your public key as a connection

        LoadConnections(connectionkey, thisPrivatekey, thisPublickey).then(() => {
            // refresh
            console.log('reload cliqs')
        })
    }


    // Signing In
    async function LoadConnections(thekey, thisPrivatekey, thisPublickey) {
        const data = {
            'Connection Key': thekey.toString(),
            'Private Key': thisPrivatekey.toString(),
            'Public Key': thisPublickey.toString()
        }

        const response = await fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/MakeConnectionFromSender',
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

    return (
        <form
            className='addkeys-containt'
            onSubmit={showorhidePKbox}>
            <input id='newpublickey' className='addkeys' type='text' name='addpk' placeholder='Add Cliqs with public key' />
            <button style={{ visibility: 'hidden' }} type="submit" value="Submit"></button>
        </form>
    )
}

export default Addpk