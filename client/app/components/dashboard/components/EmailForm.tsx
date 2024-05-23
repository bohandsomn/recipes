'use client'

import { useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useAuthDispatch } from '@/components/auth'
import { IServerResponse } from '@/types'
import { useNotification } from '@/utils/notification'

interface IEmailFormProps {
    submit: string
    success: string
    action: (prevState: unknown) => Promise<IServerResponse<200>>
}

const initialState = {
    data: null,
    error: null,
} as never as IServerResponse<200>

export const EmailForm: FC<IEmailFormProps> = ({ submit, success, action }) => {
    const [state, formAction] = useFormState(action, initialState)
    const router = useRouter()
    const notify = useNotification()
    useEffect(() => {
        if (state.data) {
            notify.success(success)
            router.push('/')
        }
        if (state.error) {
            notify.error(state.error)
        }
    }, [state])
    return (
        <form action={formAction}>
            <button type="submit">{submit}</button>
        </form>
    )
}
