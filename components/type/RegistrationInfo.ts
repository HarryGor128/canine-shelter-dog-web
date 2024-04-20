import LoginInfo from './LoginInfo';

class RegistrationInfo extends LoginInfo {
    signUpCode: string;

    constructor() {
        super();
        this.signUpCode = '';
    }
}

export default RegistrationInfo;
