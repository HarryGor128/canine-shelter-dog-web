'use client';

import { useEffect, useState } from 'react';

import ApiSetting from '../../constant/ApiSetting';
import WebSocketMsg from '../../type/WebSocketMsg';

const useWebSocket = () => {
    const [chatMessage, setChatMessage] = useState<WebSocketMsg>(
        new WebSocketMsg(),
    );

    useEffect(() => {
        const chatWebSocket = new WebSocket(ApiSetting.wsURL);

        chatWebSocket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(
                '🚀 ~ file: useWebSocket.ts:17 ~ useWebSocket ~ data:',
                data,
            );
            setChatMessage(data);
        };

        return () => {
            chatWebSocket.close();
        };
    }, []);

    return { chatMessage };
};

export default useWebSocket;
