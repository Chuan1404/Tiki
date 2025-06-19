import { IMessageBroker } from "devchu-common";
import { Transporter } from "nodemailer";
import { IMailUseCase } from "../interface";

export class MailUseCase implements IMailUseCase {
    constructor(
        private readonly transporter: Transporter,
        private readonly messageBroker: IMessageBroker
    ) {}
    async sendMail(toEmail: string, subject: string, html: string): Promise<boolean> {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to: toEmail,
            subject,
            html,
        });
        return true;
    }
}
