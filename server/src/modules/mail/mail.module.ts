import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter.js'
import { Module } from '@nestjs/common'

import * as path from 'path'

import { Environment } from '@/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/service/modules/app-config/services/app-config/app-config.service'

import { MailService } from './services/mail/mail.service'

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (appConfigService: AppConfigService) => {
                const host = appConfigService.get(Environment.MAIL_HOST)
                const user = appConfigService.get(Environment.SMTP_USERNAME)
                const password = appConfigService.get(Environment.SMTP_PASSWORD)
                const port = appConfigService.get(Environment.SMTP_PORT)
                return {
                    transport: {
                        host,
                        secure: false,
                        auth: {
                            user,
                            pass: password,
                        },
                        port,
                        tls: {
                            rejectUnauthorized: false,
                        },
                    },
                    template: {
                        dir: path.join(__dirname, 'constants', 'templates'),
                        adapter: new EjsAdapter(),
                        options: {
                            strict: false,
                        },
                    },
                }
            },
            inject: [AppConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
