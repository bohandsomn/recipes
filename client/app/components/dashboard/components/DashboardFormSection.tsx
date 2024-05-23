import React, { FC, PropsWithChildren } from 'react'

interface IDashboardFormSectionProps extends PropsWithChildren {
    header: string
}

export const DashboardFormSection: FC<IDashboardFormSectionProps> = ({
    header,
    children
}) => {
    return (
        <section className="space-y-2">
            <h2 className="text-3xl">{header}</h2>
            {children}
        </section>
    )
}
