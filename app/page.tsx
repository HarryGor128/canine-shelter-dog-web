import { Provider } from 'react-redux';
import { store } from '../components/store/store';
import useAxiosInterceptors from '../components/common/useAxiosInterceptors';

const Home = () => {
    useAxiosInterceptors();

    return (
        <Provider store={store}>
            <div style={{ flex: 1 }}></div>
        </Provider>
    );
};

export default Home;
