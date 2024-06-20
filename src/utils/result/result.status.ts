import { Ok, Err } from './result.type';

export class ResultStatus {
    public static ok<T>(data: T): Ok<T> {
        return { type: 'OK', data };
    }

    public static err<E extends Error>(error: E): Err<E> {
        //* Add Error Handler if required
        return { type: 'ERROR', error };
    }
}
