import { redirect } from 'next/navigation'
import { FC } from 'react'
import { activateUser } from '@/actions'
import { Document } from '@/components'
import { getLanguages } from '@/utils/languages'

interface IActivateProps {
    params: {
        link: string
    }
}

const Activate: FC<IActivateProps> = async ({ params: { link } }) => {
    const { error: errorMessage } = await activateUser(link)
    if (!errorMessage) {
        redirect('/')
    }
    const translate = await getLanguages()
    const header = translate('auth.constants.activation.header')
    const hint = translate('auth.constants.activation.hint')
    return (
        <section>
            <h1 className="text-4xl">{header}</h1>
            <p>{errorMessage}</p>
            <p>{hint}</p>
        </section>
    )
}

export default Activate
