'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { Page } from '@/constants'
import { IUserPayloadDto } from '@/services'
import { IServerResponse } from '@/types'
import { useLanguages } from '@/utils/languages/useLanguages'
import { useNotification } from '@/utils/notification'
import { MAX_PASSWORD, MIN_PASSWORD } from '../constants'
import { useAuthDispatch } from '../context'

interface IAuthFormSectionProps {
    header: string
    submit: string
    already: string
    linkTitle: string
    link: Page
    action: (
        prevState: unknown,
        formData: FormData,
    ) => Promise<IServerResponse<IUserPayloadDto>>
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
    const confirmPasswordPlaceholder = translate(
        'auth.constants.placeholder.confirm-password',
    )
    const or = translate('common.auth.form.external-log-in')
    const google = translate('auth.constants.external.google')
    return (
        <section className="space-y-2 rounded bg-white p-4">
            <h2 className="text-xl">{header}</h2>
            <form action={formAction} className="flex flex-col space-y-2">
                <input
                    name="email"
                    type="email"
                    required
                    placeholder={emailPlaceholder}
                />
                <input
                    name="password"
                    type="password"
                    required
                    minLength={MIN_PASSWORD}
                    maxLength={MAX_PASSWORD}
                    placeholder={passwordPlaceholder}
                />
                {link === Page.LOG_IN && (
                    <input
                        name="confirm-password"
                        type="password"
                        required
                        minLength={MIN_PASSWORD}
                        maxLength={MAX_PASSWORD}
                        placeholder={confirmPasswordPlaceholder}
                    />
                )}
                <button type="submit">{submit}</button>
            </form>
            <p className="text-center">{or}</p>
            <Link
                href="/api/google"
                className="flex justify-center space-x-2 rounded border border-solid border-x-slate-300 p-2"
            >
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
