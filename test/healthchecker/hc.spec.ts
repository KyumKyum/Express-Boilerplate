import {Observable, Subject} from "rxjs";
import hc from "./sample.resource";
import {SystemStatus} from "../../src/constants/SystemStatus";


jest.mock('./sample.resource', () => {
    const mockSubject = new Subject<SystemStatus>();
    return {
        __esModule: true,
        default: mockSubject.asObservable(),
        mockSubject: mockSubject,
    };
});

describe('HealthChecker', () => {
    let mockSubject: Subject<SystemStatus>;

    beforeEach(() => {
        mockSubject = require("./sample.resource").mockSubject;
    });

    it('should change status to FLATLINE when sample is dead', (done) => {
        hc.subscribe((status) => {
            if (status === SystemStatus.FLATLINE) {
                done();
            }
        });

        mockSubject.next(SystemStatus.FLATLINE);
    });

    it('should change status to PULSE when sample is alive', (done) => {
        hc.subscribe((status) => {
            if (status === SystemStatus.PULSE) {
                done();
            }
        });

        mockSubject.next(SystemStatus.PULSE);
    });

});
