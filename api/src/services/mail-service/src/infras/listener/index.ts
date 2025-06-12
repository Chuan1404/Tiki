import { IMessageListener } from "devchu-common";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { IMailUseCase } from "../../interface";

export class UserCreatedHandler implements IMessageListener {
    constructor(private readonly usecase: IMailUseCase) {}

    async handle(data: any): Promise<any> {
        try {
            const filePath = path.join(process.cwd(), "template", "welcome.hbs");
            const source = fs.readFileSync(filePath, "utf8");
            const template = handlebars.compile(source);
            const html = template({ name: "Anchu", verifyLink: "" });
            await this.usecase.sendMail(data.email, "Xác nhận tài khoản của bạn", html);
            return true;
        } catch (error) {
            console.error("Error in UserCreatedHandler:", error);
            throw error;
        }
    }
}
