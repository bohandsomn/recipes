import { AuthSection } from '@/components'
import React, { FC, PropsWithChildren } from 'react'

const AuthLayout: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <AuthSection>
            {children}
        </AuthSection>
    )
}

export default AuthLayout