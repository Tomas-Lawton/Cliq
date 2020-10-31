import React, { useState } from 'react';
import LoadRequests from './LoadRequests'

function ChatScreen(props) {
    const [expandorhide, changestate] = useState(true)
    const REQUESTS = props.CLIQ['Connection Requests']
    // console.log("CLIQ: ", props.CLIQ);
    const PrivateKey = props.CLIQ['Private Key']
    const animatesidebar = () => {
        changeBarStyle()
    }

    const changeBarStyle = () => {
        if (expandorhide) {
            document.getElementById("rightside").style.transitionDuration = "1s";
            document.getElementById("rightside").style.width = "15%";
            document.getElementById("rightside").style.opacity = "100%";
            document.getElementById("midSection").style.transitionDuration = "1s";
            document.getElementById("midSection").style.width = "45%";
        } else {
            document.getElementById("rightside").style.transitionDuration = "1s";
            document.getElementById("rightside").style.width = "0%";
            document.getElementById("rightside").style.opacity = "30%";
            document.getElementById("midSection").style.transitionDuration = "1s";
            document.getElementById("midSection").style.width = "60%";
        }
        changestate(!expandorhide)
    }

    return (
        <section>
            <div id='rightside' className="rightbar">

                {/* <button onClick={animatesidebar}></button> */}
                <LoadRequests
                    REQUESTS={REQUESTS}
                    PrivateKey={PrivateKey}
                    animatesidebar={animatesidebar} />
            </div>
        </section>
    )
}

export default ChatScreen