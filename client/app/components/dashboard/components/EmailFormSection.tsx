import React from 'react'
import { sendConfirmEmail } from '@/actions'
import { getLanguages } from '@/utils/languages'
import { DashboardFormSection } from './DashboardFormSection'
import { EmailForm } from './EmailForm'

export const EmailFormSection = async () => {
    const translate = await getLanguages()
    const header = translate('dashboard.email.header')
    const submit = translate('dashboard.email.submit')
    const success = translate('dashboard.email.success')
    return (
        <DashboardFormSection header={header}>
            <EmailForm
                action={sendConfirmEmail}
                submit={submit}
                success={success}
            />
        </DashboardFormSection>
    )
}
