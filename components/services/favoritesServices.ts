import axios from 'axios';

import APIResult from '../type/APIResult';
import Favorite from '../type/Favorite';

import ApiEndpoint from '../constant/ApiEndpoint';

const favoritesServices = {
    async getUserFavoritesList(email: string): Promise<number[]> {
        try {
            const result = await axios.get(
                ApiEndpoint.favorites.getUserFavoritesList,
                { params: { email } },
            );
            console.log(
                '🚀 ~ file: favoritesServices.ts:14 ~ getUserFavoritesList ~ result:',
                result,
            );

            return Promise.resolve(result.data ? result.data : []);
        } catch (error) {
            console.log(
                '🚀 ~ file: favoritesServices.ts:16 ~ getUserFavoritesList ~ error:',
                error,
            );
            return Promise.resolve([]);
        }
    },

    async addFavorite(addRecord: Favorite): Promise<APIResult> {
        try {
            const result = await axios.post(
                ApiEndpoint.favorites.addFavorite,
                addRecord,
            );

            const data = result.data;
            if (data === undefined) {
                return Promise.resolve({
                    result: false,
                    msg: '',
                });
            }

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log(
                '🚀 ~ file: favoritesServices.ts:41 ~ addFavorite ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error as string });
        }
    },

    async deleteFavorite(deleteRecord: Favorite): Promise<APIResult> {
        try {
            const result = await axios.delete(
                ApiEndpoint.favorites.deleteFavorite,
                {
                    params: deleteRecord,
                },
            );

            const data = result.data;
            if (data === undefined) {
                return Promise.resolve({
                    result: false,
                    msg: '',
                });
            }

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log(
                '🚀 ~ file: favoritesServices.ts:68 ~ deleteFavorite ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error as string });
        }
    },
};

export default favoritesServices;
