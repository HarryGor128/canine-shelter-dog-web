'use client';
import useAxiosInterceptors from '../hook/common/useAxiosInterceptors';

const HookProvider = ({ children }: { children: React.ReactNode }) => {
    useAxiosInterceptors();

    return <>{children}</>;
};

export default HookProvider;
