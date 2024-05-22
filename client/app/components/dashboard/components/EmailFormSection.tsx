import React from 'react'
import { getLanguages } from '@/utils/languages'
import { sendConfirmEmail } from '@/actions'
import { EmailForm } from './EmailForm'

export const EmailFormSection = async () => {
    const translate = await getLanguages()
    const header = translate('dashboard.email.header')
    const submit = translate('dashboard.email.submit')
    return (
        <section className="space-y-2">
            <h2 className="text-3xl">{header}</h2>
            <EmailForm action={sendConfirmEmail} submit={submit} />
        </section>
    )
}
