import React, { FC, PropsWithChildren } from 'react'

export const SectionWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <section className="space-y-4 bg-[#FCD9C5]">{children}</section>
}
