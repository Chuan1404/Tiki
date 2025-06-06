import amqp, { Channel, ConsumeMessage } from "amqplib";
import { IMessage, IMessageBroker, IMessageListener } from "../interface/messageBroker.interface";

export class RabbitMQ implements IMessageBroker {
    private channel!: Channel;
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    async connect(): Promise<void> {
        try {
            const connection = await amqp.connect(this.url);
            this.channel = await connection.createChannel();
            console.log(`RabbitMQ connected successfully - ${this.url}`);
        } catch (err) {
            console.log(`RabbitMQ connected fail - ${this.url}`);
            setTimeout(() => this.connect(), 5000);
        }
    }

    async publish(message: IMessage): Promise<void> {
        const { exchange, routingKey, data } = message;
        await this.channel.assertExchange(exchange, "topic", { durable: true });
        const buffer = Buffer.from(JSON.stringify(data));
        this.channel.publish(exchange, routingKey, buffer, {
            persistent: true,
        });
        console.log("Published to %s:%s →", exchange, routingKey, data);
    }

    async publishAndWait(message: IMessage, timeout: number = 5000): Promise<void> {
        const { exchange, routingKey, data } = message;
        const correlationId = crypto.randomUUID();
        const { queue } = await this.channel.assertQueue("", { exclusive: true });

        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Timeout waiting for response"));
            }, timeout);

            this.channel.consume(
                queue,
                (msg) => {
                    if (msg?.properties.correlationId === correlationId) {
                        clearTimeout(timer);
                        const response = JSON.parse(msg.content.toString());
                        resolve(response);
                    }
                },
                { noAck: true }
            );

            // Gửi message với replyTo và correlationId
            this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)), {
                replyTo: queue,
                correlationId,
                persistent: true,
            });
        });
    }

    async subscribe(
        exchange: string,
        routingKey: string,
        listener: IMessageListener
    ): Promise<void> {
        const queueName = `${exchange}.${routingKey}.queue`;
        await this.channel.assertExchange(exchange, "topic", { durable: true });
        const q = await this.channel.assertQueue(queueName, { durable: true });
        await this.channel.bindQueue(q.queue, exchange, routingKey);

        this.channel.consume(q.queue, async (msg: ConsumeMessage | null) => {
            if (msg) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    await listener.handle(content);
                    this.channel.ack(msg);
                } catch (err) {
                    console.error("Error handling message:", err);
                    this.channel.nack(msg, false, false); // Không requeue
                }
            }
        });

        console.log(`Subscribed to ${exchange}:${routingKey} on queue ${queueName}`);
    }

    unsubscribe(messageName: string, listener: IMessageListener): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
