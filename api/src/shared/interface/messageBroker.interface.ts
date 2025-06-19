export interface IMessage<T = any> {
    exchange: string;
    routingKey: string;
    data: T;
  }

export interface IMessageListener<T = any> {
    handle(data: T): Promise<any>;
}

export interface IMessageBroker {
    publish(message: IMessage): Promise<void>;
    publishAndWait(message: IMessage, timeout?: number): Promise<any>;
    subscribe(exchange: string, routingKey: string, listener: IMessageListener ): Promise<void>;
    unsubscribe(messageName: string, listener: IMessageListener ): Promise<void>;
}
