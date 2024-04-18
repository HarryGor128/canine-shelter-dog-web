import axios from 'axios';
import ApiEndpoint from '../constant/ApiEndpoint';
import Dog from '../type/Dog';

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
};

export default dogServices;
