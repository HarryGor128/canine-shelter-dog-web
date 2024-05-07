'use client';

import { useEffect, useState } from 'react';

import { List, ListItem, ListItemText } from '@mui/material';

import useWebSocket from '../../hook/common/useWebSocket';
import chatServices from '../../services/chatServices';
import { useAppSelector } from '../../store/storeHooks';
import ChatMessage from '../../type/ChatMessage';

const myMsgColor = '#428bff';
const otherMsgColor = '#e6e6e6';

const ChatRoom = () => {
    const { userInfo } = useAppSelector((state) => state.user);

    const [chatMsgList, setChatMsgList] = useState<ChatMessage[]>([]);

    const { chatMessage } = useWebSocket();

    const getChatList = async () => {
        const result = await chatServices.getChatAllHistory();

        if (result) {
            setChatMsgList(result);
        }
    };

    useEffect(() => {
        getChatList();
    }, []);

    useEffect(() => {
        if (chatMessage) {
            const idList = chatMsgList.map((row) => row.id);

            setChatMsgList((prev) => {
                let newList = prev;

                switch (chatMessage.changeType) {
                    case 'added':
                        if (!idList.includes(chatMessage.data.id)) {
                            newList.push(chatMessage.data);
                        }
                        break;
                    case 'modified':
                        const findIndex = idList.findIndex(
                            (item) => item === chatMessage.data.id,
                        );
                        newList[findIndex] = chatMessage.data;
                        break;
                    case 'removed':
                        newList = newList.filter(
                            (item) => item.id !== chatMessage.data.id,
                        );
                        break;
                    default:
                        break;
                }

                return newList;
            });
        }
    }, [chatMessage]);

    return (
        <div>
            <List
                id='MainWin'
                sx={{
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                {chatMsgList.map((item, index) => (
                    <ListItem
                        key={index}
                        style={{
                            justifyContent:
                                item.email === userInfo.user.email
                                    ? 'flex-end'
                                    : 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                padding: '5px 10px',
                                maxWidth: '50%',
                                borderRadius: 10,
                                background:
                                    item.email === userInfo.user.email
                                        ? myMsgColor
                                        : otherMsgColor,
                            }}
                        >
                            <ListItemText primary={item.msg} />
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ChatRoom;
