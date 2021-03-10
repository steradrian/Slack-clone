import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId, chatRef }) {

    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);
    
    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        });

        chatRef.current.scrollIntoView({
            behavior: "smooth",
        })

        setInput("");
    };

    return (
        <ChatInputContainer>
            <form>
                <input
                    placeholder={`Message #${channelName}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button type='submit' hidden onClick={sendMessage}>Send</Button>
            </form>
            
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        border-radius: 5px;
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        padding: 20px;
        outline: none;
    }

    > form > Button {
        display: none;
    }
`;
