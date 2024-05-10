'use client';

import { useState } from 'react';

import ChatList from './components/ChatList/ChatList';
import SendMsgBox from './components/SendMsgBox/SendMsgBox';

import useChatMsg from '../../hook/useChatMsg';
import ChatMessage from '../../type/ChatMessage';
import CallbackType from './CallbackType';

const ChatRoom = () => {
    const [selectMsg, setSelectMsg] = useState<ChatMessage>(new ChatMessage());
    const [callbackType, setCallbackType] = useState<CallbackType>('add');

    const { chatMsgList, chatMessage } = useChatMsg();

    return (
        <div>
            <ChatList
                chatMsgList={chatMsgList}
                lastMsg={chatMessage}
                callbackType={callbackType}
                setSelectMsg={setSelectMsg}
                setCallbackType={setCallbackType}
            />
            <SendMsgBox
                selectMsg={selectMsg}
                callbackType={callbackType}
                setCallbackType={setCallbackType}
            />
        </div>
    );
};

export default ChatRoom;
