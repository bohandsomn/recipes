export interface INotificationService {
    success(message: string, id?: string): void
    error(message: string, id?: string): void
    info(message: string, id?: string): void
    pending(message: string): string
    dismiss(id: string): void
}
