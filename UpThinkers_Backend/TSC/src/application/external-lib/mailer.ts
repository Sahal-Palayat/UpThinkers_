import { IMailer } from "../interfaces/external-lib/IMailer";
import { genRandomOtp } from "../functions/CommonFunctions";
import sendMail from "../functions/SendMail";

export class MailerImp implements IMailer {
     async sendMail(email: string): Promise<{ otp: string; success: boolean; }> {
        const otp = genRandomOtp()
        const result = await sendMail(email,otp)
        return {otp:otp,success: result.success}
    }
}