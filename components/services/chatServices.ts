import axios from 'axios';

import APIResult from '../type/APIResult';
import ChatMessage from '../type/ChatMessage';
import UploadFile from '../type/UploadFile';

import ApiEndpoint from '../constant/ApiEndpoint';

const chatServices = {
    async getChatAllHistory(): Promise<ChatMessage[]> {
        try {
            const result = await axios.get(ApiEndpoint.chat.getChatAllHistory);
            console.log(
                '🚀 ~ file: chatServices.ts:10 ~ getChatAllHistory ~ result:',
                result,
            );

            return Promise.resolve(result.data ? result.data : []);
        } catch (error) {
            return Promise.resolve([]);
        }
    },

    async addMessage(newMsg: ChatMessage): Promise<APIResult> {
        try {
            const result = await axios.post(
                ApiEndpoint.chat.addMessage,
                newMsg,
            );
            console.log(
                '🚀 ~ file: chatServices.ts:28 ~ addMessage ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status < 400,
                msg: '',
            });
        } catch (error: any) {
            console.log(
                '🚀 ~ file: chatServices.ts:38 ~ addMessage ~ error:',
                error,
            );

            return Promise.resolve({
                result: false,
                msg: error as string,
            });
        }
    },

    async updateMessage(updateMsg: ChatMessage): Promise<APIResult> {
        try {
            const result = await axios.put(
                ApiEndpoint.chat.updateMessage,
                updateMsg,
            );
            console.log(
                '🚀 ~ file: chatServices.ts:57 ~ updateMessage ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status < 400,
                msg: '',
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: chatServices.ts:64 ~ updateMessage ~ error:',
                error,
            );

            return Promise.resolve({
                result: false,
                msg: error as string,
            });
        }
    },

    async deleteMessage(id: number): Promise<APIResult> {
        try {
            const result = await axios.delete(ApiEndpoint.chat.deleteMessage, {
                params: { id },
            });
            console.log(
                '🚀 ~ file: chatServices.ts:84 ~ deleteMessage ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status < 400,
                msg: '',
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: chatServices.ts:94 ~ deleteMessage ~ error:',
                error,
            );

            return Promise.resolve({
                result: false,
                msg: error as string,
            });
        }
    },

    async uploadImage(file: UploadFile): Promise<string> {
        try {
            const result = await axios.post(ApiEndpoint.chat.uploadImage, file);
            console.log(
                '🚀 ~ file: chatServices.ts:110 ~ uploadImage ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error) {
            console.log(
                '🚀 ~ file: chatServices.ts:117 ~ uploadImage ~ error:',
                error,
            );

            return Promise.resolve(error as string);
        }
    },
};

export default chatServices;
