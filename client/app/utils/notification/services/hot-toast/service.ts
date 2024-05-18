import toast from 'react-hot-toast'
import { ERROR_DURATION, SUCCESS_DURATION } from '../../constants'
import { INotificationService } from '../../types'

export class HotToastNotificationService implements INotificationService {
    success(message: string, id?: string): void {
        toast.success(message, {
            duration: SUCCESS_DURATION,
            id,
        })
    }

    error(message: string, id?: string): void {
        toast.error(message, {
            duration: ERROR_DURATION,
            id,
        })
    }

    pending(message: string): string {
        const id = toast.loading(message)
        return id
    }

    dismiss(id: string): void {
        toast.dismiss(id)
    }

    info(message: string, id?: string | undefined): void {
        toast(message, {
            id,
        })
    }
}
