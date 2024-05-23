import { redirect } from 'next/navigation'
import { configuration } from '@/config'

export async function GET() {
    redirect(`${configuration.authServerUrl}/google`)
}
