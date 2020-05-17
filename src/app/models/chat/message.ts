export interface IMessage {
    id?: string;
    senderName?: string;
    senderId?: string;
    text: string;
    when?: Date;
    receiverId?: string;
}
