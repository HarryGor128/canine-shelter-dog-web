import axios from 'axios';

import APIResult from '../type/APIResult';
import Dog from '../type/Dog';
import UploadFile from '../type/UploadFile';

import ApiEndpoint from '../constant/ApiEndpoint';

const dogServices = {
    async getAllDogsInfo(): Promise<Dog[]> {
        try {
            const result = await axios.get(ApiEndpoint.dog.getAllDogsInfo);
            console.log(
                '🚀 ~ file: dogServices.ts:7 ~ getAllDogsInfo ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:16 ~ getAllDogsInfo ~ error:',
                error,
            );
            return Promise.resolve([] as Dog[]);
        }
    },

    async addDogInfo(dogInfo: Dog): Promise<APIResult> {
        try {
            const result = await axios.post(
                ApiEndpoint.dog.addNewDogInfo,
                dogInfo,
            );
            console.log(
                '🚀 ~ file: dogServices.ts:31 ~ addDogInfo ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status <= 400,
                msg: '',
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:41 ~ addDogInfo ~ error:',
                error,
            );

            return Promise.resolve({
                result: false,
                msg: error as string,
            });
        }
    },

    async updateDogInfo(dogInfo: Dog): Promise<APIResult> {
        try {
            const result = await axios.put(
                ApiEndpoint.dog.updateDogInfo,
                dogInfo,
            );
            console.log(
                '🚀 ~ file: dogServices.ts:59 ~ updateDogInfo ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status <= 400,
                msg: '',
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:69 ~ updateDogInfo ~ error:',
                error,
            );

            return Promise.resolve({
                result: false,
                msg: error as string,
            });
        }
    },

    async deleteDogInfo(id: number): Promise<APIResult> {
        try {
            const result = await axios.delete(ApiEndpoint.dog.deleteDogInfo, {
                params: id,
            });
            console.log(
                '🚀 ~ file: dogServices.ts:87 ~ deleteDogInfo ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status <= 400,
                msg: '',
            });
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:97 ~ deleteDogInfo ~ error:',
                error,
            );

            return Promise.resolve({
                result: false,
                msg: error as string,
            });
        }
    },

    async uploadDogPhoto(file: UploadFile): Promise<string> {
        try {
            const result = await axios.post(
                ApiEndpoint.dog.uploadDogPhoto,
                file,
            );
            console.log('🚀 ~ uploadDogPhoto ~ result:', result);

            return Promise.resolve(result.data);
        } catch (error) {
            console.log('🚀 ~ uploadDogPhoto ~ error:', error);
            return Promise.resolve(error as string);
        }
    },
};

export default dogServices;
