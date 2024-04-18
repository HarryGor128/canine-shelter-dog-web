import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProvider from '../components/provider/AppProvider';
import InitializeHook from './InitializeHook';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

library.add(fab, far, fas);

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Hello word!',
    description: 'Hello word',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AppProvider>
                    <InitializeHook>{children}</InitializeHook>
                </AppProvider>
            </body>
        </html>
    );
}
