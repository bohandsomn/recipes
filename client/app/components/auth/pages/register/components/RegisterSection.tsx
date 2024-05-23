import React from 'react'
import { registerUser } from '@/actions'
import { AuthFormSection } from '@/components/auth/components'
import { Page } from '@/constants'
import { getLanguages } from '@/utils/languages'

export const RegisterSection = async () => {
    const translate = await getLanguages()
    const header = translate('auth.constants.register.header')
    const submit = translate('auth.constants.register.submit')
    const already = translate('auth.constants.register.already')
    const linkTitle = translate('auth.constants.log-in.header')
    return (
        <AuthFormSection
            header={header}
            submit={submit}
            already={already}
            linkTitle={linkTitle}
            link={Page.LOG_IN}
            action={registerUser}
        />
    )
}
