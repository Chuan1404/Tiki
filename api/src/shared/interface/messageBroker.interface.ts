export interface IMessage<T = any> {
    exchange: string;
    routingKey: string;
    data: T;
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
