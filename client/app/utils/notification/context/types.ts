import { IState } from '@/utils'
import { INotificationService } from '../types'

export interface INotificationContext extends IState, INotificationService { }
