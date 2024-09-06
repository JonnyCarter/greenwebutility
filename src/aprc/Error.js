// Error.js
class Error {
    constructor(errorCode, errorMessage, invalidFields) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.invalidFields = invalidFields; // Array of fields that caused the error
    }

    // Method to log or display error details
    logError() {
        // TODO: Implement logic to log or display error messages, including invalid fields.
        console.table(Error)
    }
}

module.exports = Error;
