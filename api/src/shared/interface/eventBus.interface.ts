export interface IEvent {
    exchange: string;
    routingKey: string;
    data: any;
  }

export interface EventListener {
    handle(data: any): Promise<void>;
}

export interface IEventBus {
    publish(event: IEvent): Promise<void>;
    subscribe(exchange: string, routingKey: string, listener: EventListener): Promise<void>;
    unsubscribe(eventName: string, listener: EventListener): Promise<void>;
}
