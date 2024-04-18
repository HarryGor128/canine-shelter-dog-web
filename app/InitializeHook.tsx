'use client';
import useAxiosInterceptors from '../components/hook/common/useAxiosInterceptors';

const InitializeHook = ({ children }: { children: React.ReactNode }) => {
    useAxiosInterceptors();

    return <>{children}</>;
};

export default InitializeHook;
