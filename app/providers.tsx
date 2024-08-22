'use client';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <Toaster /> */}
            {children}
        </>
    );
}

export default Providers;
