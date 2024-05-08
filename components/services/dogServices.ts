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

            return Promise.resolve(result.data ? result.data : []);
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
                result: result.status < 400,
                msg: '',
            });
        } catch (error: any) {
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
                result: result.status < 400,
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
                params: { id },
            });
            console.log(
                '🚀 ~ file: dogServices.ts:87 ~ deleteDogInfo ~ result:',
                result,
            );

            return Promise.resolve({
                result: result.status < 400,
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
            console.log(
                '🚀 ~ file: dogServices.ts:117 ~ uploadDogPhoto ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error) {
            console.log('🚀 ~ uploadDogPhoto ~ error:', error);
            return Promise.resolve(error as string);
        }
    },

    async getDogBreedsList(): Promise<string[]> {
        try {
            const result = await axios.get(ApiEndpoint.dog.getBreedsList);
            console.log(
                '🚀 ~ file: dogServices.ts:129 ~ getDogBreedsList ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:139 ~ getDogBreedsList ~ error:',
                error,
            );
            return Promise.resolve([]);
        }
    },

    async getBreedImg(breed: string): Promise<string> {
        try {
            const result = await axios.get(ApiEndpoint.dog.getBreedImg, {
                params: { breed },
            });
            console.log(
                '🚀 ~ file: dogServices.ts:141 ~ getBreedImg ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:156 ~ getBreedImg ~ error:',
                error,
            );
            return Promise.resolve('');
        }
    },

    async getDogWithList(idList: number[]): Promise<Dog[]> {
        try {
            const result = await axios.get(ApiEndpoint.dog.getDogWithList, {
                params: { id: JSON.stringify(idList) },
            });
            console.log(
                '🚀 ~ file: dogServices.ts:170 ~ getDogWithList ~ result:',
                result,
            );

            return Promise.resolve(result.data);
        } catch (error) {
            console.log(
                '🚀 ~ file: dogServices.ts:174 ~ getDogWithList ~ error:',
                error,
            );
            return Promise.resolve([]);
        }
    },
};

export default dogServices;
