import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage } from '../../models';
import { AppSettings } from '../settings';
import { Hire } from '../../models/hiring/hire';

@Injectable({
    providedIn: 'root'
})
export class OfferNotificationService {
    offerReceived = new EventEmitter<Hire>();
    connectionEstablished = new EventEmitter<Boolean>();

    private _hubConnection: HubConnection;

    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    private createConnection() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(AppSettings.hubHost + '/hubs/notification')
            .build();
    }

    private startConnection(): void {
        this._hubConnection
            .start()
            .then(() => {
                this.connectionEstablished.emit(true);
            })
            .catch(() => {
                setTimeout(this.startConnection, 5000);
            });
    }

    private registerOnServerEvents(): void {
        this._hubConnection.on('ReceiveOffer', (data: Hire) => {
            this.offerReceived.emit(data);
        });
    }
}
