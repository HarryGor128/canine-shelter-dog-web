const ApiEndpoint = {
    dog: {
        getAllDogsInfo: 'dog/getAllDogsInfo',
        getDogInfo: 'dog/getDogInfo',
        addNewDogInfo: 'dog/addNewDogInfo',
        updateDogInfo: 'dog/updateDogInfo',
        deleteDogInfo: 'dog/deleteDogInfo',
    },
    auth: {
        Login: 'auth/login',
        registration: 'auth/registration',
        roleQuery: 'auth/roleQuery',
    },
};

export default ApiEndpoint;