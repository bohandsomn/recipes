import React from 'react'
import { getLanguages } from '@/utils/languages'
import { PasswordForm } from './PasswordForm'
import { setPassword } from '@/actions'

export const PasswordFormSection = async () => {
    const translate = await getLanguages()
    const header = translate('dashboard.password.header')
    const placeholder = translate('auth.constants.placeholder.password')
    const submit = translate('dashboard.password.submit')
    return (
        <section>
            <h2 className="text-3xl">{header}</h2>
            <PasswordForm submit={submit} placeholder={placeholder} action={setPassword} />
        </section>
    )
}
