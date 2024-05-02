import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProvider from '../components/provider/AppProvider';
import HookProvider from '../components/provider/HookProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppSnackBar from '../components/components/common/AppSnackBar/AppSnackBar';
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'The Canine Shelter',
    description: 'The Canine Shelter',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className} style={{ margin: 0 }}>
                <CookiesProvider>
                    <AppProvider>
                        <HookProvider>
                            <AppSnackBar>{children}</AppSnackBar>
                        </HookProvider>
                    </AppProvider>
                </CookiesProvider>
            </body>
        </html>
    );
}
