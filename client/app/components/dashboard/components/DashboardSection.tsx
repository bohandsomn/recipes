import React from 'react'
import { Container, SectionWrapper } from '@/components/common'
import { EmailFormSection } from './EmailFormSection'
import { LogOutFormSection } from './LogOutFormSection'
import { PasswordFormSection } from './PasswordFormSection'

export const DashboardSection = () => {
    return (
        <Container>
            <SectionWrapper>
                <PasswordFormSection />
                <EmailFormSection />
                <LogOutFormSection />
            </SectionWrapper>
        </Container>
    )
}
