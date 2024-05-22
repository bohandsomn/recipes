import React from 'react'
import { getLanguages } from '@/utils/languages'
import { logInUser } from '@/actions'
import { AuthFormSection } from '@/components/auth/components'
import { Page } from '@/constants'

export const LogInSection = async () => {
    const translate = await getLanguages()
    const header = translate('auth.constants.log-in.header')
    const submit = translate('auth.constants.log-in.submit')
    const already = translate('auth.constants.log-in.already')
    const linkTitle = translate('auth.constants.register.header')
    return (
        <AuthFormSection 
            header={header} 
            submit={submit} 
            already={already} 
            linkTitle={linkTitle} 
            link={Page.AUTH}
            action={logInUser} 
        />
    )
}
