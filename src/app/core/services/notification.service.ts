import { Injectable } from '@angular/core';

import { Notification } from '@models/notification.model';
import { Log } from 'ng2-logger';
import { NotificationType } from '@models/enums/notificationType.enum';
import { HubConnection } from '@aspnet/signalr-client/dist/src';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';

/**
 * Service class for routing notifications to handling components.
 */
@Injectable()
export class NotificationService {
    _logger = Log.create(NotificationService.name);

    private _connectionUrl = `${environment.baseURL}/${environment.notificationQueue}`;
    private _hubConnection: HubConnection;

    // Observable notification queue
    private notificationQueue = new Subject<Notification>();
    linesToolRequestsQueueObservable = this.notificationQueue.asObservable();

    constructor() {
    }

    subscribeToMessageSource() {
        this._hubConnection = new HubConnection(this._connectionUrl);

        this._hubConnection.start()
            .then(() => {
                this._logger.info('subscribeToMessageSource:: Connected to SignalR queue');
            })
            .catch(err => {
                this._logger.error('subscribeToMessageSource:: Could not connect to SignalR queue', err);
            });

        this._hubConnection.on('OnPublishMessage', (receivedMessage: Notification) => {
            this.processNotification(receivedMessage)
        });
    }


    processNotification(notification: Notification) {
        switch (notification.type) {
            // Tool request scenario
            case NotificationType.SOME_NOTIFICATION:
                this.notificationQueue.next(notification);
                break;
        }
        this._logger.info('processNotification:: Processing', notification);
    }

}
