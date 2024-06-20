import _ from 'lodash';

import { Observable, Subject } from 'rxjs';
import { SystemStatus } from '../constants/SystemStatus';
import { initRedis } from '../provider/redis.provider';
import { redisHcObservable } from '../provider/hc/redis.hc';

export interface StatusIndicator {
    source: Service;
    status: SystemStatus;
}

enum Service {
    SERVER = 'server',
    REDIS = 'redis',
}

class HealthChecker {
    private _monitor = new Subject<StatusIndicator>();
    private servicesStatus: { [key in Service]: SystemStatus } = {
        [Service.SERVER]: SystemStatus.FLATLINE,
        [Service.REDIS]: SystemStatus.FLATLINE,
    };

    constructor() {
        this.updateServiceStatus(Service.SERVER, SystemStatus.INITIALIZING);

        // bootstrap to dependent services
        this.bootstrapRedis();

        // Start checking the overall system status
        this.updateServiceStatus(Service.SERVER, SystemStatus.BOOTSTRAPPED);
        this.checkAllServices();
    }

    public get monitor(): Observable<StatusIndicator> {
        return this._monitor.asObservable();
    }

    private updateServiceStatus(source: Service, status: SystemStatus) {
        this.servicesStatus[source] = status;
        this._monitor.next({ status, source });

        this.checkAllServices();
    }

    private checkAllServices() {
        const allServicesAlive = _.every(this.servicesStatus, (status) => status === SystemStatus.BOOTSTRAPPED);

        if (allServicesAlive) {
            this._monitor.complete(); //* Bootstrapped!
        }
    }

    private interruptServer(source: Service) {
        this._monitor.error({ source, status: SystemStatus.FLATLINE });
    }

    private bootstrapRedis() {
        redisHcObservable.subscribe({
            next: (status: SystemStatus) => {
                this.updateServiceStatus(Service.REDIS, status);
            },
            //complete: redundant check
            error: () => {
                this.updateServiceStatus(Service.REDIS, SystemStatus.FLATLINE);
                this.interruptServer(Service.REDIS);
            },
        });
        initRedis();
    }
}

const hc = new HealthChecker().monitor;
export default hc;
