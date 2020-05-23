import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../../core/chat/chat.service';
import { CurrentUserService } from '../../../core/permission/services';
import { IMessage } from '../../../models';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    public txtMessage: string = '';
    public receiverName: string;
    public receiverTopic: string;
    public messages: IMessage[] = [];
    private _receiverId: string;
    private _uniqueId: string;

    constructor(
        private _chatService: ChatService,
        private _currentUserService: CurrentUserService,
        private _router: Router,
        private _ngZone: NgZone
    ) {
        this.subscribeToEvents();
        this._setUniqueId();
        const extras = this._router.getCurrentNavigation().extras;
        const state = extras ? extras.state : null;
        if (state) {
            this.receiverName = state.receiverName;
            this.receiverTopic = state.receiverTopic;
            this._receiverId = state.receiverId;
        }
    }

    public sendMessage(): void {
        if (this.txtMessage) {
            const message = {
                senderId: this._uniqueId,
                type: 'sent',
                text: this.txtMessage,
                when: new Date(),
                receiverId: this._receiverId,
            };
            this.messages.push(message);
            this._chatService.sendChatMessage(message);
            this.txtMessage = '';
        }
    }

    public get header(): string {
        let header = 'Chat';
        if (this.receiverName) {
            header += ` With ${this.receiverName}`;
        }
        if (this.receiverTopic) {
            header += ` About ${this.receiverTopic}`;
        }

        return header;
    }

    private subscribeToEvents(): void {
        this._chatService.messageReceived.subscribe((message: IMessage) => {
            this._ngZone.run(() => {
                if (message.senderId !== this._uniqueId && message.receiverId === this._uniqueId) {
                    message.type = 'received';
                    this._receiverId = this._receiverId ? this._receiverId : message.senderId;
                    this.messages.push(message);
                }
            });
        });
    }

    private _setUniqueId(): void {
        this._uniqueId = this._currentUserService.userInfo ? this._currentUserService.userInfo.companyId : null;
        this._currentUserService.userInfoChanged.subscribe(_ => {
            this._uniqueId = this._currentUserService.userInfo ? this._currentUserService.userInfo.companyId : null;
        });
    }
}
