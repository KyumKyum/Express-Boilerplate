import { Observable, Subject } from 'rxjs';
import { SystemStatus } from '../../constants/SystemStatus';

class ProviderHealthChecker {
    private _subject = new Subject<SystemStatus>();

    public get observable(): Observable<SystemStatus> {
        return this._subject.asObservable();
    }

    public bootstrap() {
        this._subject.next(SystemStatus.INITIALIZING);
    }

    public ready() {
        this._subject.next(SystemStatus.BOOTSTRAPPED);
        this._subject.complete();
    }

    public dead() {
        this._subject.error(SystemStatus.FLATLINE);
    }
}

export default ProviderHealthChecker;
