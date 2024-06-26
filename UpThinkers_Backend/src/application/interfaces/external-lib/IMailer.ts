export interface IMailer{
    sendMail(email: string): Promise<{ otp: string, success: boolean }>;
}