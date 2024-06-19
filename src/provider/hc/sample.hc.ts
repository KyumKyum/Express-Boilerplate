//* HC module for implementing providers.

//* The server health checker will subscribe these modules to check provider's status (db, mq, etc...)
//* Define hc for each providers based on the sample provided below.

// import { Observable, Subject } from 'rxjs';
// import { SystemStatus } from '../../constants/SystemStatus';
//
// class SampleHc {
//     private _subject = new Subject<SystemStatus>();
//
//     public get observable(): Observable<SystemStatus> {
//         return this._subject.asObservable();
//     }
//
//     public isReady() {
//         this._subject.next(SystemStatus.BOOTSTRAPPED);
//     }
//
//     public isDead() {
//         this._subject.next(SystemStatus.FLATLINE);
//     }
// }
//
// const sampleHc = new SampleHc();
// const sampleHcObservable = sampleHc.observable;
// export default sampleHcObservable;
