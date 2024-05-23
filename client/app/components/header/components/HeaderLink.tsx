import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

interface IHeaderLinkProps {
    icon: ReactNode
    title: string
    path: string
}

export const HeaderLink: FC<IHeaderLinkProps> = ({ icon, title, path }) => {
    return (
        <li>
            <Link href={path} title={title}>
                {icon}
            </Link>
        </li>
    )
}
