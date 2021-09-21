import React, {useState} from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';

//CSS
import styles from './ChatMessage.module.css';

function ChatMessage({ messages, setMessages }) {
    const [inputText, setInputText] = useState('');

    //Can rework on this implementation after sync up with backend
    const sendMessage = () => {
        if (inputText !== '') {
            setMessages([...messages, {party: 'You', message: inputText}]);
            setInputText('');
        }
    }

    return (
        <div>
            <Paper elevation={3} className={styles.chatContainer}>
                <List>
                    {
                        messages.map((message) => (
                            <ListItem className={styles.test}>
                                <div className={message.party === 'You' ? `${styles.textBubble} ${styles.receiverText}` : `${styles.textBubble} ${styles.senderText}`}>
                                    {message.message}
                                </div>
                            </ListItem>
                        ))
                    }
                </List>
            </Paper>
            <Paper className={styles.messageInputSection}>
                <input className={styles.sendText} value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                <Button variant="contained" className={styles.sendButton} onClick={() => sendMessage()}>
                    Send
                </Button>
            </Paper>
        </div>
    );
}

export default ChatMessage;