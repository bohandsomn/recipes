import { IState } from '@/utils/context'
import { INotificationService } from '../types'

export interface INotificationContext extends IState, INotificationService {}
