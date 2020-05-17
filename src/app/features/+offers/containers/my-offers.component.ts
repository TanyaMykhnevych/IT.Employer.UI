import { Component, NgZone } from '@angular/core';
import { IMessage } from '../../../models';
import { ChatService } from '../../../core/chat/chat.service';

@Component({
    selector: 'app-my-offers',
    templateUrl: './my-offers.component.html',
})
export class MyOffersComponent {
    public messages: IMessage[] = [];
    canSendMessage: boolean;

    constructor(
        private signalrService: ChatService,
        private _ngZone: NgZone,
    ) {
        this.subscribeToEvents();
        const interval = setInterval(this.sendMessage.bind(this), 5000);
    }

    public sendMessage(): void {
        this.signalrService.sendChatMessage({ text: 'Hello' });
    }

    private subscribeToEvents(): void {
        this.signalrService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });

        this.signalrService.messageReceived.subscribe((message: IMessage) => {
            this._ngZone.run(() => {
                this.messages.push(message);
            });
        });
    }
}
