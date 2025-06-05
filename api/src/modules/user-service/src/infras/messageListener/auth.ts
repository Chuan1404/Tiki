import { IMessageListener } from "devchu-common";

export class AuthRegisteredHandler implements IMessageListener {
    async handle(data: any): Promise<void> {
        console.log("UserHttpService: User registered", data);
    }
} 