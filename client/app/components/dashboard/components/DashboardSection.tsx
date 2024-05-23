import React from 'react'
import { Container, SectionWrapper } from '@/components/common'
import { PasswordFormSection } from './PasswordFormSection'
import { EmailFormSection } from './EmailFormSection'
import { LogOutFormSection } from './LogOutFormSection'

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
