import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./features/login-page/login-page";
import { MeetingRoom } from "./features/meeting-room/MeetingRoom";
import UserDetailsProvider from "./user-context";
import { SocketProvider } from "./socket-context";

function App() {
  const [roomID, setRoomID] = useState();

  return (
    <Router>
      <div className="App">
        <UserDetailsProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={<LoginPage setRoomID={setRoomID} roomID={roomID} />}
            />
            <Route
              exact
              path="/room/:roomID"
              element={
                <SocketProvider>
                  <MeetingRoom roomID={roomID} setRoomID={setRoomID} />
                </SocketProvider>
              }
            />
          </Routes>
        </UserDetailsProvider>
      </div>
    </Router>
  );
}

export default App;
