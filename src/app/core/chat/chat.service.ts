import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage } from '../../models';
import { AppSettings } from '../settings';

@Injectable()
export class ChatService {
    messageReceived = new EventEmitter<IMessage>();
    connectionEstablished = new EventEmitter<Boolean>();

    private connectionIsEstablished = false;
    private _hubConnection: HubConnection;

    public constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    public sendChatMessage(message: IMessage) {
        this._hubConnection.invoke('SendMessage', message);
    }

    private createConnection() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(AppSettings.hubHost + '/hubs/chat')
            .build();
    }

    private startConnection(): void {
        this._hubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(this.startConnection, 5000);
            });
    }

    private registerOnServerEvents(): void {
        this._hubConnection.on('ReceiveMessage', (data: any) => {
            this.messageReceived.emit(data);
        });
    }
}
