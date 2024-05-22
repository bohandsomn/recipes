'use client'

import React, { FC, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IServerResponse } from '@/types'
import { IUserPayloadDto } from '@/services'
import { Page } from '@/constants'
import { useLanguages } from '@/utils/languages/useLanguages'
import { useFormState } from 'react-dom'
import { useAuthDispatch } from '../context'
import { useRouter } from 'next/navigation'
import { useNotification } from '@/utils/notification'

interface IAuthFormSectionProps {
    header: string
    submit: string
    already: string
    linkTitle: string
    link: Page
    action: (prevState: unknown, formData: FormData) => Promise<IServerResponse<IUserPayloadDto>>
}

const initialState = {
    data: null,
    error: null,
} as never as IServerResponse<IUserPayloadDto>

export const AuthFormSection: FC<IAuthFormSectionProps> = ({
    header,
    submit,
    already,
    linkTitle,
    link,
    action,
}) => {
    const [state, formAction] = useFormState(action, initialState)
    const dispatch = useAuthDispatch()
    const router = useRouter()
    const notify = useNotification()
    useEffect(() => {
        dispatch({
            isLoading: false,
            ...state,
        })
        if (state.data) {
            router.push('/')
        }
        if (state.error) {
            notify.error(state.error)
        }
    }, [state])
    const translate = useLanguages()
    const emailPlaceholder = translate('auth.constants.placeholder.email')
    const passwordPlaceholder = translate('auth.constants.placeholder.password')
    const confirmPasswordPlaceholder = translate('auth.constants.placeholder.confirm-password')
    const or = translate('common.auth.form.external-log-in')
    const google = translate('auth.constants.external.google')
    return (
        <section className="bg-white rounded p-4 space-y-2">
            <h2 className="text-xl">{header}</h2>
            <form action={formAction} className="flex flex-col space-y-2">
                <input 
                    name="email" 
                    type="email" 
                    className="input" 
                    placeholder={emailPlaceholder}
                />
                <input 
                    name="password" 
                    type="password" 
                    className="input" 
                    placeholder={passwordPlaceholder}
                />
                {link === Page.LOG_IN && <input 
                    name="confirm-password"
                    type="password" 
                    className="input" 
                    placeholder={confirmPasswordPlaceholder}
                />}
                <button type="submit" className="button">
                    {submit}
                </button>
            </form>
            <p className="text-center">{or}</p>
            <Link href="/api/google" className="flex justify-center space-x-2 p-2 border border-x-slate-300 border-solid rounded">
                <Image 
                    src="/assets/images/google-logo.webp" 
                    alt={google} 
                    width={24} 
                    height={24} 
                />
                <span className="block">{google}</span>
            </Link>
            <p className="text-center">
                {already}{' '}
                <Link href={link} className="text-yellow-600"> 
                    {linkTitle}
                </Link>
            </p>
        </section>
    )
}
