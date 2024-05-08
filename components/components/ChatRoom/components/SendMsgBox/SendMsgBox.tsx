import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Send } from '@mui/icons-material';
import { Input } from '@mui/material';

import chatServices from '../../../../services/chatServices';
import { useAppSelector } from '../../../../store/storeHooks';
import APIResult from '../../../../type/APIResult';
import ChatMessage from '../../../../type/ChatMessage';
import Button from '../../../common/Button/Button';
import CallbackType from '../../CallbackType';

interface SendMsgBoxProps {
    selectMsg: ChatMessage;
    callbackType: CallbackType;
    setCallbackType: Dispatch<SetStateAction<CallbackType>>;
}

const SendMsgBox = ({
    selectMsg,
    callbackType,
    setCallbackType,
}: SendMsgBoxProps) => {
    const { userInfo } = useAppSelector((state) => state.user);

    const [sendMsg, setSendMsg] = useState<ChatMessage>(new ChatMessage());

    const createNewMsg = () => {
        const newMsg = new ChatMessage();
        newMsg.email = userInfo.user.email;

        setSendMsg(newMsg);
    };

    useEffect(() => {
        createNewMsg();
    }, []);

    useEffect(() => {
        if (callbackType === 'update') {
            setSendMsg(selectMsg);
        }
    }, [selectMsg, callbackType]);

    const onInput = (text: string) => {
        setSendMsg((prev) => {
            return { ...prev, msg: text };
        });
    };

    const onPressSend = async () => {
        let result: APIResult = { result: false, msg: '' };

        switch (callbackType) {
            case 'add':
                result = await chatServices.addMessage(sendMsg);
                break;
            case 'update':
                result = await chatServices.updateMessage(sendMsg);
                break;
            default:
                break;
        }

        if (result.result) {
            createNewMsg();
            setCallbackType('add');
        }
    };

    return (
        <div style={{ padding: 10 }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    padding: 10,
                    backgroundColor: '#e6e6e6',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Input
                    placeholder={'Message'}
                    value={sendMsg.msg}
                    onChange={(event) => onInput(event.target.value)}
                    style={{ flex: 1, display: 'flex', margin: '0 10px 0 0' }}
                />
                <Button
                    onPress={() => {
                        onPressSend();
                    }}
                    text={'Send'}
                    endIcon={<Send />}
                    disabled={!sendMsg.msg}
                />
            </div>
        </div>
    );
};

export default SendMsgBox;
