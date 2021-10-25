// Import Settings
import React, { useState, useEffect } from "react";

// import Redux
import {
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
  sendMessage,
} from "../../actions/match";
import { useSelector } from "react-redux";

// Import Material-ui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

// Import CSS
import styles from "./ChatMessage.module.css";

function ChatMessage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const auth = useSelector((state) => state.auth);
  const match = useSelector((state) => state.match);

  const handleSendMessage = () => {
    if (inputText !== "") {
      setMessages([...messages, { token: auth.token, message: inputText }]);
      sendMessage(auth.token, inputText);
      setInputText("");
    }
  };

  const handleReceiveMessage = (_token, msg) => {
    setMessages([...messages, { token: _token, message: msg }]);
  };

  //Triggers when ENTER key is pressed
  const handleSendKeypress = (e) => {
    if (e.which === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    initiateSocket(match.data.roomId);
    subscribeToChat((err, data) => {
      if (err) {
        disconnectSocket();
        return;
      }
      if (data.token != auth.token) {
        handleReceiveMessage(data.token, data.message);
      }
    });
  }, []);

  return (
    <div>
      <Grid item md={12} className="center-text">
        <h2>You have matched with John!</h2>
        {/* Can find a way to pass in matched person's name through socket io since profile is retrieved upon login */}
      </Grid>
      <Paper elevation={3} className={styles.chatContainer}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <div
                className={
                  message.token === auth.token
                    ? `${styles.textBubble} ${styles.receiverText}`
                    : `${styles.textBubble} ${styles.senderText}`
                }
              >
                {message.message}
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper className={`${styles.messageInputSection}`}>
        <input
          autoFocus
          value={inputText}
          onKeyPress={handleSendKeypress}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.sendText}
        />
        <Button
          variant="contained"
          className={styles.sendButton}
          onClick={() => handleSendMessage()}
        >
          Send
        </Button>
      </Paper>
    </div>
  );
}

export default ChatMessage;
