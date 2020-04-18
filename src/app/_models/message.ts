export interface Message {
    id: number;
    dialogueId: number;
    userIdFrom: number;
    data: string;
    msgTime: Date;
}
