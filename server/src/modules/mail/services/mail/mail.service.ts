import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'

import { IConfirmMailInput } from '../../interfaces/confirm-mail-input.interface'
import { IMailService } from '../../interfaces/mail-service.interface'

@Injectable()
export class MailService implements IMailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly languagesService: I18nLanguagesService,
    ) {}

    async confirmMail(input: IConfirmMailInput): Promise<void> {
        const subject = this.languagesService.constant(
            'mail.confirm-mail.subject',
        )
        const title = this.languagesService.constant('mail.confirm-mail.title')
        const header = this.languagesService.constant(
            'mail.confirm-mail.header',
        )
        const messageClick = this.languagesService.constant(
            'mail.confirm-mail.message-click',
        )
        const messageAnchor = this.languagesService.constant(
            'mail.confirm-mail.message-anchor',
        )
        const messageLink = this.languagesService.constant(
            'mail.confirm-mail.message-link',
        )
        await this.mailerService.sendMail({
            to: input.email,
            subject,
            template: './confirm-mail',
            context: {
                link: input.activationLink,
                title,
                header,
                messageClick,
                messageAnchor,
                messageLink,
            },
        })
    }
}
