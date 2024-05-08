import { useEffect, useState } from 'react';

import ChatMessage from '../type/ChatMessage';

import useWebSocket from './common/useWebSocket';

import chatServices from '../services/chatServices';

const useChatMsg = () => {
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
                let newList = JSON.parse(JSON.stringify(prev)) as ChatMessage[];

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

    return { chatMsgList, chatMessage };
};

export default useChatMsg;
