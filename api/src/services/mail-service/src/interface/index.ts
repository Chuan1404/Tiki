export interface IMailUseCase {
    sendMail(toEmail: string, subject: string, html: string): Promise<boolean>;
}
