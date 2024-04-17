import { Provider } from 'react-redux';
import { store } from '../../components/store/store';
import useAxiosInterceptors from '../../components/hook/common/useAxiosInterceptors';

const HomePage = () => {
    return <div style={{ flex: 1 }}></div>;
};

const Home = () => {
    useAxiosInterceptors();

    return (
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
};

export default Home;
