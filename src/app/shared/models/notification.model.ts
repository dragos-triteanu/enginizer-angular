export class Notification {
    public Id: number;
    public notificationType: string;
    public message: string;

    constructor(notification: any = {}) {
        this.Id = notification.Id || 0;
        this.notificationType = notification.notificationType;
        this.message = notification.message || '';
    }

    get type() {
        return 'notification';
    }
}
