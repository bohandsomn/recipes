'use client'

import { useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useAuthDispatch } from '@/components/auth/context'
import { IServerResponse } from '@/types'
import { useNotification } from '@/utils/notification'

interface ILogOutFormProps {
    submit: string
    success: string
    action: (prevState: unknown) => Promise<IServerResponse<200>>
}

const initialState = {
    data: null,
    error: null,
} as never as IServerResponse<200>

export const LogOutForm: FC<ILogOutFormProps> = ({
    submit,
    success,
    action,
}) => {
    const [state, formAction] = useFormState(action, initialState)
    const router = useRouter()
    const notify = useNotification()
    const dispatch = useAuthDispatch()
    useEffect(() => {
        if (state.data) {
            notify.success(success)
            dispatch({
                data: null,
                isLoading: true,
                error: null,
            })
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
