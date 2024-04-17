'use client';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    return (
        <button type='button' onClick={() => router.push('/helloWorld')}>
            Go to Hello World
        </button>
    );
};

export default Home;
