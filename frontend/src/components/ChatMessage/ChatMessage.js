// Import Settings
import React, { useState } from "react";

// import Redux
import { sendMessage } from "../../actions/match";
import { useSelector } from "react-redux";

// Import Material-ui
import { Button, Grid, List, ListItem, Paper } from "@material-ui/core";

// Import CSS
import styles from "./ChatMessage.module.css";

function ChatMessage({ messages, setMessages }) {
  const [inputText, setInputText] = useState("");

  const auth = useSelector((state) => state.auth);
  const match = useSelector((state) => state.match);

  const handleSendMessage = () => {
    if (inputText !== "") {
      sendMessage(match.data.roomId, auth.token, inputText);
      setMessages((oldMessages) => [
        ...oldMessages,
        { token: auth.token, message: inputText },
      ]);
      setInputText("");
    }
  };

  //Triggers when ENTER key is pressed
  const handleSendKeypress = (e) => {
    if (e.which === 13) {
      handleSendMessage();
    }
  };

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
        <Grid container>
          <Grid item xs={11}>
            <input
              autoFocus
              value={inputText}
              onKeyPress={handleSendKeypress}
              onChange={(e) => setInputText(e.target.value)}
              className={styles.sendText}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              className={styles.sendButton}
              onClick={() => handleSendMessage()}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ChatMessage;
