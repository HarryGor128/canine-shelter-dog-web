import {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Delete, MoreVert, Update } from '@mui/icons-material';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    SxProps,
    Theme,
} from '@mui/material';

import useWindowSize from '../../../../hook/common/useWindowSize';
import chatServices from '../../../../services/chatServices';
import { useAppSelector } from '../../../../store/storeHooks';
import ChatMessage from '../../../../type/ChatMessage';
import WebSocketMsg from '../../../../type/WebSocketMsg';
import DateFormat from '../../../../utils/date/DateFormat';
import dateConverter from '../../../../utils/date/dateConverter';
import ButtonGroup from '../../../common/ButtonGroup/ButtonGroup';
import CallbackType from '../../CallbackType';

interface ChatListProps {
    chatMsgList: ChatMessage[];
    lastMsg: WebSocketMsg; // For scroll
    setSelectMsg: Dispatch<SetStateAction<ChatMessage>>;
    setCallbackType: Dispatch<SetStateAction<CallbackType>>;
}

interface ChatListItemProps {
    item: ChatMessage;
    index: number;
    onPressOption: (chatMsg: ChatMessage) => void;
}

interface ChatMsgRendererProps {
    msg: string;
    type: 'text' | 'img';
    myMsg: boolean;
}

const myMsgColor = '#428bff';
const otherMsgColor = '#e6e6e6';

const ChatMsgRenderer = ({ msg, type, myMsg }: ChatMsgRendererProps) => {
    switch (type) {
        case 'text':
            return (
                <ListItemText
                    style={{
                        color: myMsg ? 'white' : 'black',
                    }}
                    primary={msg}
                />
            );
        case 'img':
            return (
                <img
                    src={msg}
                    style={{
                        width: '100%',
                        maxHeight: 300,
                        contain: 'content',
                    }}
                />
            );
        default:
            return <></>;
    }
};

const ChatListItem = ({ item, index, onPressOption }: ChatListItemProps) => {
    const { width } = useWindowSize();

    const [showOption, setShowOption] = useState<boolean>(false);

    const { userInfo, isStaff } = useAppSelector((state) => state.user);

    const myMsg = item.email === userInfo.user.email;

    return (
        <ListItem
            key={index}
            style={{
                flexDirection: myMsg ? 'row-reverse' : undefined,
            }}
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
        >
            <div
                style={{
                    display: 'grid',
                }}
            >
                {!myMsg && (
                    <ListItemText
                        style={{
                            color: 'gray',
                            justifySelf: myMsg ? 'flex-end' : 'flex-start',
                        }}
                        primary={item.email}
                    />
                )}
                <div
                    style={{
                        padding: '5px 10px',
                        borderRadius: 10,
                        background: myMsg ? myMsgColor : otherMsgColor,
                        maxWidth: width * 0.5,
                        wordWrap: 'break-word',
                    }}
                >
                    <ChatMsgRenderer
                        msg={item.msg}
                        type={item.type}
                        myMsg={myMsg}
                    />
                </div>
                <ListItemText
                    style={{
                        color: 'gray',
                        justifySelf: myMsg ? 'flex-end' : 'flex-start',
                    }}
                    primary={`${dateConverter.unixTimeToDateString(
                        item.createTime,
                        DateFormat.YYYYMMddHHmm,
                    )}${item.createTime < item.lastUpdate ? ' Edited' : ''}`}
                />
            </div>
            {((myMsg && showOption) || (isStaff && showOption)) && (
                <IconButton
                    style={{ margin: '0 10px' }}
                    onClick={() => onPressOption(item)}
                >
                    <MoreVert />
                </IconButton>
            )}
        </ListItem>
    );
};

const ChatList = ({
    chatMsgList,
    lastMsg,
    setSelectMsg,
    setCallbackType,
}: ChatListProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [showOption, setOption] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<ChatMessage>(
        new ChatMessage(),
    );

    useEffect(() => {
        if (lastMsg.changeType === 'added') {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lastMsg]);

    const onPressOption = (chatMsg: ChatMessage) => {
        setSelectItem(chatMsg);
        setOption(true);
    };

    const onCloseOption = () => {
        setSelectItem(new ChatMessage());
        setSelectMsg(new ChatMessage());
        setCallbackType('add');
        setOption(false);
    };

    const onPressUpdate = () => {
        setSelectItem(new ChatMessage());
        setSelectMsg(selectItem);
        setCallbackType('update');
        setOption(false);
    };

    const onPressDelete = async () => {
        await chatServices.deleteMessage(selectItem.id);
        onCloseOption();
    };

    return (
        <>
            <List
                sx={{
                    height: '74vh',
                    overflow: 'auto',
                }}
            >
                {chatMsgList.map((item, index) => (
                    <ChatListItem
                        item={item}
                        index={index}
                        onPressOption={onPressOption}
                    />
                ))}
                <div ref={messagesEndRef} />
            </List>
            <Modal open={showOption} onClose={onCloseOption}>
                <Box sx={popupStyle}>
                    <div style={popupBox}>
                        <ButtonGroup
                            buttonGroup={
                                selectItem.type === 'text'
                                    ? [
                                          {
                                              text: 'Update',
                                              onPress: onPressUpdate,
                                              endIcon: <Update />,
                                          },
                                          {
                                              text: 'Delete',
                                              onPress: onPressDelete,
                                              endIcon: <Delete />,
                                          },
                                      ]
                                    : [
                                          {
                                              text: 'Delete',
                                              onPress: onPressDelete,
                                              endIcon: <Delete />,
                                          },
                                      ]
                            }
                            margin={'0'}
                        />
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ChatList;

const popupStyle: SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    borderRadius: 10,
};

const popupBox: CSSProperties = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};
