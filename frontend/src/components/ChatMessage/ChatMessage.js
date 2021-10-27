// Import Settings
import React, { useState, useEffect } from "react";

// import Redux
import {
  listenForMessages,
  disconnectSocket,
  sendMessage,
} from "../../actions/match";
import { useSelector } from "react-redux";

// Import Material-ui
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

// Import CSS
import styles from "./ChatMessage.module.css";

function ChatMessage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const auth = useSelector((state) => state.auth);

  const handleSendMessage = () => {
    if (inputText !== "") {
      sendMessage(auth.token, inputText);
      setMessages([...messages, { token: auth.token, message: inputText }]);
      setInputText("");
    }
  };

  //Triggers when ENTER key is pressed
  const handleSendKeypress = (e) => {
    if (e.which === 13) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    listenForMessages((err, data) => {
      if (err) {
        disconnectSocket();
        return;
      }
      if (data.token != auth.token) {
        setMessages([
          ...messages,
          { token: data.token, message: data.message },
        ]);
      }
    });
  }, [messages]);

  return (
    <div>
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
