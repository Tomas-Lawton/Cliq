import React, { useState } from 'react';
import Switch from 'react-ios-switch';
import Clique from "./Clique"
import CreateCliq from './CreateCliq'
import Addpk from './Addpk'

function LeftPanel(props) {
    const [switchstate, setSwitch] = useState(false)
    const [otherCliqs, setCliqs] = useState([])

    const [displayMakeCliq, switchNewCliq] = useState(false)

    // USING IS LOADED TO STOP INFINATE REACT LOOPS WHEN CHECKING CONTENT
    const [isloaded, setload] = useState(false)
    // const [displayset, setdisplay] = useState()

    const CLIQ = props.CLIQ
    // const INFO = props.INFO

    if (!isloaded) {
        if (CLIQ['Connection Keys']) {
            LoadOtherCliqs(CLIQ['Connection Keys']).then(data => {
                setCliqs(data)
                setload(true)
            })
        }
    }

    // ARRAY
    async function LoadOtherCliqs(connectedkeys) {
        const data = { 'body': { "keys": connectedkeys } }
        const response = await fetch('https://69oa1fa496.execute-api.ap-southeast-2.amazonaws.com/GetInfoFromPublicKeys',
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

    const openCreateCliq = () => {
        switchNewCliq(!displayMakeCliq)
    }

    console.log("Reload Left")
    console.log('other cliq: ', otherCliqs);

    return (
        <section className="left">
            {/* <h2>Welcome, {props.data.name} </h2> */}
            <h1>{CLIQ['Name']}</h1>
            <h2>Public: <span className='orange'> {CLIQ['Public Key']}</span></h2>
            <hr className="divider" />
            <div className='fix-size'>
                <div className="add-scenes">
                    <h2>Your Cliques</h2>
                    <Switch
                        checked={switchstate}
                        onChange={() => setSwitch(!switchstate)}
                        onColor="#434343"
                        handleColor="#E5E5E5"
                    />
                </div>

                {switchstate ?
                    <Addpk
                        thisprivate={CLIQ['Private Key']}
                        thispublic={CLIQ['Public Key']}
                    />
                    : null
                }
                {CLIQ ?
                    <div className='CliqueContain'>
                        <Clique
                            main={true}
                            name={CLIQ['Name']}
                            connections={CLIQ['Connection Keys'].length}
                            group={CLIQ['Members']}
                        />

                        {otherCliqs ?
                            otherCliqs.map((item, index) => {
                                return <Clique
                                    switchon={switchstate}
                                    main={false}
                                    key={index}
                                    index={index}
                                    name={item['Item']['Name']}
                                    connections={item['Item']['Connection Keys'].length}
                                    group={CLIQ['Members']}
                                />
                            })
                            :
                            <h2>Add some Cliqs!</h2>
                        }
                    </div>
                    : null
                }
            </div>
            <div className="icon-space-containter">
                <div className="method-icons">
                    <img onClick={openCreateCliq} src={require("./icons/3.svg")} alt="Merge Icon" />
                    <img src={require("./icons/1.svg")} alt="Merge Icon" />
                    <img src={require("./icons/2.svg")} alt="Merge Icon" />
                </div>
            </div>

            {displayMakeCliq ?
                <CreateCliq
                    toggle={openCreateCliq} />
                :
                null}
        </section>

    )
}

export default LeftPanel