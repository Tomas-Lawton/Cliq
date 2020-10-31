import React, { useState } from 'react';

function Clique(props) {
    const [groupSize, setgroup] = useState()
    const [isloaded, setload] = useState(false)


    if (!isloaded) {
        if (props.group) {
            let members = props.group
            let groupsize = Object.keys(members).length
            setgroup(groupsize)
            setload(true)
        }
    }

    let className
    let svgIcon
    if (props.main) {
        className = 'mainCliq'
        svgIcon = 'house'
    } else {
        className = 'connectedCliq'
        svgIcon = 'groupIcon'
    }

    let cliqID = 'CliqID' + props.index

    return (
        <div id={cliqID} className={className}>
            <div className="sub-clique">
                <img src={require(`./iconsfinal/${svgIcon}.svg`)} alt="Merge Icon" height="20px" />
                <h3>{props.name}</h3>
            </div>

            <div className="sub-clique">
                <h3>{props.connections}</h3>
                <img src={require("./iconsfinal/connection.svg")} alt="Merge Icon" height="12px" />
                <h3>{groupSize}</h3>
                <img src={require("./iconsfinal/group.svg")} alt="Merge Icon" height="20px" />
                {props.switchon ?
                    <img className='styleCross2' src={require("./iconsfinal/cross2.svg")} alt="Cross Icon" onClick={() => {

                        // DISPLAY COMPONENT POP UP: ARE YOU SURE????? THen..
                        document.getElementById(cliqID).style.display = 'none';
                    }} />
                    : null
                }
            </div>
        </div>
    )
}


export default Clique