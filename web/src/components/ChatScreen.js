import React from 'react';
import LeftPanel from './LeftPanel';
import MidPanel from './MidPanel';
import RightPanel from './RightPanel';

function ChatScreen(props) {

    console.log("LOADED CHAT")
    return (
        <div className="chat-container">
            {props.data.Cliqueinfo ?
                <LeftPanel
                    CLIQ={props.data.Cliqueinfo}
                    INFO={props.data.localloginstate} />
                :
                <h2>Loading Cliqs</h2>
            }
            {props.data.Cliqueinfo ?
                <MidPanel
                    data={props}
                    CLIQ={props.data.Cliqueinfo}
                    INFO={props.data.localloginstate} />
                :
                <h2>Loading Chat</h2>
            }
            {props.data.Cliqueinfo ?
                <RightPanel
                    CLIQ={props.data.Cliqueinfo}
                />
                :
                null
            }
        </div>
    )
}

export default ChatScreen