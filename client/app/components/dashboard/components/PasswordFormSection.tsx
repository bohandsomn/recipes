import React from 'react'
import { setPassword } from '@/actions'
import { getLanguages } from '@/utils/languages'
import { DashboardFormSection } from './DashboardFormSection'
import { PasswordForm } from './PasswordForm'

export const PasswordFormSection = async () => {
    const translate = await getLanguages()
    const header = translate('dashboard.password.header')
    const placeholder = translate('auth.constants.placeholder.password')
    const submit = translate('dashboard.password.submit')
    const success = translate('dashboard.password.success')
    return (
        <DashboardFormSection header={header}>
            <PasswordForm
                submit={submit}
                success={success}
                placeholder={placeholder}
                action={setPassword}
            />
        </DashboardFormSection>
    )
}
