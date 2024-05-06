const ApiEndpoint = {
    dog: {
        getAllDogsInfo: 'dog/getAllDogsInfo',
        getDogInfo: 'dog/getDogInfo',
        addNewDogInfo: 'dog/addNewDogInfo',
        updateDogInfo: 'dog/updateDogInfo',
        deleteDogInfo: 'dog/deleteDogInfo',
        uploadDogPhoto: 'dog/uploadDogPhoto',
        getBreedsList: 'dog/getBreedsList',
        getBreedImg: 'dog/getBreedImg',
        getDogWithList: 'dog/getDogWithList',
    },
    auth: {
        Login: 'auth/login',
        registration: 'auth/registration',
        roleQuery: 'auth/roleQuery',
    },
    favorites: {
        getUserFavoritesList: '/favorites/getUserFavoritesList',
        addFavorite: '/favorites/addFavorite',
        deleteFavorite: '/favorites/deleteFavorite',
    },
};

export default ApiEndpoint;
