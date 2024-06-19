class ValidationException extends Error {
    name = 'ValidationException';
    constructor(msg: string) {
        super(msg);
    }
}

export default ValidationException;
