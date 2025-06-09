export interface IMessage {
    exchange: string;
    routingKey: string;
    data: any;
  }

export interface IMessageListener {
    handle(data: any): Promise<any>;
}

export interface IMessageBroker {
    publish(message: IMessage): Promise<void>;
    publishAndWait(message: IMessage, timeout?: number): Promise<any>;
    subscribe(exchange: string, routingKey: string, listener: IMessageListener ): Promise<void>;
    unsubscribe(messageName: string, listener: IMessageListener ): Promise<void>;
}
