import React from 'react'
import { getLanguages } from '@/utils/languages'
import { logOutUser } from '@/actions'
import { DashboardFormSection } from './DashboardFormSection'
import { LogOutForm } from './LogOutForm'

export const LogOutFormSection = async () => {
    const translate = await getLanguages()
    const header = translate('dashboard.log-out.header')
    const submit = translate('dashboard.log-out.submit')
    const success = translate('dashboard.log-out.success')
    return (
        <DashboardFormSection header={header}>
            <LogOutForm action={logOutUser} submit={submit} success={success} />
        </DashboardFormSection>
    )
}
