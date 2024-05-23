import React from 'react'
import { getLanguages } from '@/utils/languages'
import { setPassword } from '@/actions'
import { PasswordForm } from './PasswordForm'
import { DashboardFormSection } from './DashboardFormSection'

export const PasswordFormSection = async () => {
    const translate = await getLanguages()
    const header = translate('dashboard.password.header')
    const placeholder = translate('auth.constants.placeholder.password')
    const submit = translate('dashboard.password.submit')
    const success = translate('dashboard.password.success')
    return (
        <DashboardFormSection header={header}>
            <PasswordForm submit={submit} success={success} placeholder={placeholder} action={setPassword} />
        </DashboardFormSection>
    )
}
