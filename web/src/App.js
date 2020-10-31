import React, { useState } from 'react';
import './App.css';
import ChatScreen from "./components/ChatScreen"
import Login from "./components/Login"

function App() {

  // Keeps track of sign-in status and Clique info
  const [AppInfo, UpdateApp] = useState({ isLoggedIn: false })

  // console.log("Render App", AppInfo)

  const UpdatefromLogin = (Cliqueinfo, localloginstate) => {
    UpdateApp({ ...AppInfo, Cliqueinfo: Cliqueinfo, localloginstate: localloginstate, isLoggedIn: true })
  }

  return (
    <div className="App">
      {
        AppInfo.isLoggedIn ?
          <ChatScreen
            data={AppInfo}
          />
          :
          <Login UpdateApp={UpdatefromLogin} />
      }

    </div>
  );
}

export default App;
