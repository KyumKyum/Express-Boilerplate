import _ from 'lodash';

import { Observable, Subject } from 'rxjs';
import { SystemStatus } from '../constants/SystemStatus';

export interface StatusIndicator {
    source: Service;
    status: SystemStatus;
}

enum Service {
    SERVER = 'server',
}

class HealthChecker {
    private _monitor = new Subject<StatusIndicator>();
    private servicesStatus: { [key in Service]: SystemStatus } = {
        [Service.SERVER]: SystemStatus.FLATLINE,
    };

    constructor() {
        this.updateServiceStatus(Service.SERVER, SystemStatus.INITIALIZING);

        // Subscribe to dependent services
        //this.subscribeSample('sampleService');

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
}

const hc = new HealthChecker().monitor;
export default hc;
