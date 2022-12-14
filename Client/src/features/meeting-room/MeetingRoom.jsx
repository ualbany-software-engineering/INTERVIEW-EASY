import { CircularProgress, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onUserDisconnect } from "../../socket-context/EventEmitters";
import { UserDetailsContext } from "../../user-context";
import { ChatArea } from "../chat-area/ChatArea";
import { ParticipantsList } from "../participants-list/ParticipantsList";
import { VideoArea } from "../video-area/VideoArea";
import "./MeetingRoom.css";

export const MeetingRoom = memo(({ setRoomID }) => {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const [ownUserInfo, setOwnUserInfo] = useContext(UserDetailsContext);
  const [isCodingAreaOpen, setIsCodingAreaOpen] = useState(false);

  useEffect(() => {
    if (!ownUserInfo.userName || !roomID) {
      setRoomID(roomID);
      navigate("/login");
    }
  }, [navigate, ownUserInfo.userName, roomID, setRoomID]);

  const exitRoom = useCallback(() => {
    onUserDisconnect();
    setOwnUserInfo({});
    setRoomID(undefined);
    navigate("/");
  }, [navigate, setOwnUserInfo, setRoomID]);

  const toogleCodingAreaVisibility = useCallback(() => {
    setIsCodingAreaOpen(!isCodingAreaOpen);
  }, [isCodingAreaOpen]);

  return (
    <div className="meeting-room">
      {ownUserInfo.userName ? (
        <>
          <div className="video-area">
            <VideoArea
              roomID={roomID}
              exitRoom={exitRoom}
              toogleCodingAreaVisibility={toogleCodingAreaVisibility}
              isCodingAreaOpen={isCodingAreaOpen}
            />
          </div>
          <Divider
            orientation="vertical"
            flexItem
            classes={{ root: "divider" }}
          />
          <div className="chat-and-participant-area">
            <ParticipantsList />
            <Divider
              orientation="horizontal"
              flexItem
              classes={{ root: "horizontal-divider" }}
            />
            <ChatArea />
          </div>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
});
