import {Observable, Subject} from "rxjs";
import {SystemStatus} from "../../src/constants/SystemStatus";

class SampleHc {
    private _subject = new Subject<SystemStatus>();

    public get observable(): Observable<SystemStatus> {
        return this._subject.asObservable()
    }

    public isReady() {
        this._subject.next(SystemStatus.PULSE)
    }

    public isDead(){
        this._subject.next(SystemStatus.FLATLINE)
    }
}

const sampleHc = new SampleHc();
const sampleHcObservable = sampleHc.observable
export default sampleHcObservable;

