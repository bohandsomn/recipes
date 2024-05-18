import { FC, PropsWithChildren } from 'react'
import { AppProvider } from './providers'
import './globals.css'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    )
}

export default RootLayout
