import React, { useState } from 'react';

function LoadRequests(props) {
    const requestIndex = useState(props.REQUESTS)
    const RequestLoaded = props.REQUESTS
    const [signedin, signIn] = useState(false)
    const [newArrtorender, setNewArr] = useState()

    if (!signedin) {
        const codes = loadkeys()
        console.log("Got new array: ", codes)
        setNewArr(codes)
        console.log("Codes are set")
        signIn(true)
    }

    function loadkeys() {
        let numRequests = requestIndex.length;
        if (numRequests > 0 && RequestLoaded) {
            let newarray = []
            for (let i = 0; i < numRequests; i++) {
                let pair = RequestLoaded[i]
                let recombined = []
                for (let publicK in pair) {
                    console.log('Pushed Tuple');
                    recombined.push(publicK)
                    recombined.push(pair[publicK])
                }
                newarray.push(recombined)
            }
            console.log('codes: ', newarray)
            return newarray
        }
    }

    console.log("LOADED ARR: ", newArrtorender)
    // const AcceptRequest = () => {
    //     console.log('accepted request')
    // }

    // const DenyRequest = () => {
    //     console.log('denied request')
    // }

    console.log("Loaded Request")



    // const removeRequestfromDB = () => {

    // }


    const RemovePublicRequest = (data) => {
        console.log("removed request data: ", data)
        fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/clearpublickeyrequest',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(response => response.json())
    }

    const RemoveRequest = (publicK, privateK) => {
        console.log('removed', publicK, privateK)
        // removeRequestfromDB
        var data = [props.PrivateKey, publicK, privateK];
        RemovePublicRequest(data)
    }

    const AddPublicRequest = (data) => {
        console.log("removed request data: ", data)
        fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/AddCliqFromPublicRequest',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(response => response.json())
    }

    const AddRequest = (publicK, privateK) => {
        console.log('Added', publicK, privateK)
        //  add
        var data = [props.PrivateKey, publicK, privateK];
        AddPublicRequest(data)
        // RemovePublicRequest(data)
        // removeRequestfromDB
    }

    return (
        <div>
            <div className='contain-right'>
                <div className='panelButtonContain'><button onClick={props.animatesidebar}></button></div>

                <div>
                    <h2>Private: <span className='orange'> {props.PrivateKey}</span></h2>

                    <div id='except' >
                        {
                            (newArrtorender && newArrtorender.length > 0) ?

                                newArrtorender.map((item, index) => (

                                    <div id={'publicrequestID:' + index} className='connectedCliq' key={index}>

                                        <div className="sub-clique colorhover">
                                            <p onClick={() => {
                                                document.getElementById('publicrequestID:' + index).style.display = 'none';
                                                AddRequest(item[0], item[1]);
                                            }}
                                            >{item[0]}</p>
                                        </div>
                                        <div className="sub-clique">

                                            <img className='styleCross2' src={require("./iconsfinal/cross2.svg")} alt="Cross Icon" onClick={() => {
                                                // DISPLAY COMPONENT POP UP: ARE YOU SURE????? THen..
                                                document.getElementById('publicrequestID:' + index).style.display = 'none';
                                                RemoveRequest(item[0], item[1]);
                                            }} />
                                            {/* <p>Private Key: {item[1]}</p> */}
                                        </div>

                                    </div>

                                ))
                                :
                                <h1>No requests yet!</h1>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoadRequests