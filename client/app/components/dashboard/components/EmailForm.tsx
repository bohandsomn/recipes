'use client'

import React, { FC, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useNotification } from '@/utils/notification'
import { IServerResponse } from '@/types'

interface IEmailFormProps {
    submit: string
    action: (prevState: unknown) => Promise<IServerResponse<200>>
}

const initialState = {
    data: null,
    error: null,
} as never as IServerResponse<200>

export const EmailForm: FC<IEmailFormProps> = ({
    submit,
    action
}) => {
    const [state, formAction] = useFormState(action, initialState)
    const router = useRouter()
    const notify = useNotification()
    useEffect(() => {
        if (state.data) {
            router.push('/')
        }
        if (state.error) {
            notify.error(state.error)
        }
    }, [state])
    return (
        <form action={formAction}>
            <button type="submit" className="button">{submit}</button>
        </form>
    )
}
