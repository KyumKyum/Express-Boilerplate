//* HC module for implementing providers.

//* The server health checker will subscribe these modules to check provider's status (db, mq, etc...)
//* Define hc for each providers based on the sample provided below.

import { Observable, Subject } from 'rxjs';
import { SystemStatus } from '../../constants/SystemStatus';
import ProviderHealthChecker from './provider.hc';

class RedisHealthChecker extends ProviderHealthChecker {}

const redisHealthChecker = new RedisHealthChecker();
const redisHcObservable = redisHealthChecker.observable;
export { redisHealthChecker, redisHcObservable };
