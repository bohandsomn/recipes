import { FC, PropsWithChildren } from 'react'
import './globals.css'

interface IRootProps extends PropsWithChildren {}

const RootLayout: FC<IRootProps> = ({ children }) => {
    return <>{children}</>
}

export default RootLayout
