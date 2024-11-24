class Error {
    constructor(errorCode, errorMessage, invalidFields) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.invalidFields = invalidFields; // Array of fields that caused the error
    }
    logError() {
        console.error(`Error Code: ${this.errorCode}`);
        console.error(`Error Message: ${this.errorMessage}`);
        if (this.invalidFields.length > 0) {
            console.error(`Invalid Fields: ${this.invalidFields.join(', ')}`);
        }
    }
}
module.exports = Error;
