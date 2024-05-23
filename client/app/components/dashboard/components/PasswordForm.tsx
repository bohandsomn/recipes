'use client'

import { useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { IUserPayloadDto } from '@/services'
import { IServerResponse } from '@/types'
import { useAuthDispatch } from '@/components/auth/context'
import { useNotification } from '@/utils/notification'
import { MAX_PASSWORD, MIN_PASSWORD } from '@/components/auth/constants'

interface IPasswordFormProps {
    submit: string
    placeholder: string
    success: string
    action: (prevState: unknown, formData: FormData) => Promise<IServerResponse<IUserPayloadDto>>
}

const initialState = {
    data: null,
    error: null,
} as never as IServerResponse<IUserPayloadDto>

export const PasswordForm: FC<IPasswordFormProps> = ({
    submit,
    placeholder,
    success,
    action
}) => {
    const [state, formAction] = useFormState(action, initialState)
    const dispatch = useAuthDispatch()
    const router = useRouter()
    const notify = useNotification()
    useEffect(() => {
        if (state.data) {
            dispatch({
                isLoading: false,
                ...state,
            })
            notify.success(success)
            router.push('/')
        }
        if (state.error) {
            notify.error(state.error)
        }
    }, [state])
    return (
        <form action={formAction} className="flex flex-col space-y-2 w-fit">
            <input 
                name="password" 
                type="password" 
                required
                minLength={MIN_PASSWORD}
                maxLength={MAX_PASSWORD}
                placeholder={placeholder} 
            />
            <button>{submit}</button>
        </form>
    )
}
