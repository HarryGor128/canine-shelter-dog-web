import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProvider from '../components/provider/AppProvider';
import HookProvider from '../components/provider/HookProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppSnackBar from '../components/components/common/AppSnackBar/AppSnackBar';

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
            <body className={inter.className} style={{ margin: 0 }}>
                <AppProvider>
                    <HookProvider>
                        <AppSnackBar>{children}</AppSnackBar>
                    </HookProvider>
                </AppProvider>
            </body>
        </html>
    );
}
