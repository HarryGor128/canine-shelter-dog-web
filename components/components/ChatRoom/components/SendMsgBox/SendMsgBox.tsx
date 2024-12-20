import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Close, Image, Send } from '@mui/icons-material';
import { IconButton, Input, Typography } from '@mui/material';

import chatServices from '../../../../services/chatServices';
import { useAppSelector } from '../../../../store/storeHooks';
import APIResult from '../../../../type/APIResult';
import ChatMessage from '../../../../type/ChatMessage';
import UploadFile from '../../../../type/UploadFile';
import convertBase64 from '../../../../utils/base64Converter';
import DateFormat from '../../../../utils/date/DateFormat';
import dateConverter from '../../../../utils/date/dateConverter';
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
    const uploadRef = useRef<HTMLInputElement>(null);

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

    const onPressCloseUpdateMsg = () => {
        createNewMsg();
        setCallbackType('add');
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
            onPressCloseUpdateMsg();
        }
    };

    const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file =
            event &&
            event.target &&
            event.target.files &&
            event.target.files[0];

        if (file) {
            const fileName = file.name.split('.');
            const fileType = fileName[fileName.length - 1];

            const uploadFile: UploadFile = {
                fileName: `${dateConverter.nowFileName()}.${fileType}`,
                base64: await convertBase64(file),
            };

            const imgUrl = await chatServices.uploadImage(uploadFile);

            await chatServices.addMessage({
                ...sendMsg,
                msg: imgUrl,
                type: 'img',
            });
        }
    };

    const onPressUploadIcon = () => {
        uploadRef.current?.click();
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
                    flexDirection: 'column',
                }}
            >
                {callbackType === 'update' && selectMsg && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>{`Editing message sent in ${dateConverter.unixTimeToDateString(selectMsg.createTime, DateFormat.YYYYMMddHHmm)}`}</Typography>
                        <IconButton onClick={onPressCloseUpdateMsg}>
                            <Close />
                        </IconButton>
                    </div>
                )}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Input
                        placeholder={'Message'}
                        value={sendMsg.msg}
                        onChange={(event) => onInput(event.target.value)}
                        style={{ flex: 1, display: 'flex' }}
                    />
                    <IconButton
                        color='primary'
                        component='span'
                        onClick={onPressUploadIcon}
                    >
                        <Image />
                    </IconButton>
                    <IconButton
                        color='primary'
                        onClick={onPressSend}
                        disabled={!sendMsg.msg}
                    >
                        <Send />
                    </IconButton>
                </div>
            </div>
            <input
                ref={uploadRef}
                accept='image/*'
                type='file'
                style={{ display: 'none' }}
                onChange={onUpload}
            />
        </div>
    );
};

export default SendMsgBox;
