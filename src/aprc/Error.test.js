const ErrorClass = require('../aprc/Error'); // Import the Error class

describe('Error Class', () => {
    
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('should correctly initialize error properties', () => {
        const errorInstance = new ErrorClass('VALIDATION_ERROR', 'Invalid data provided', ['loanAmount', 'interestRate']);

        expect(errorInstance.errorCode).toBe('VALIDATION_ERROR');
        expect(errorInstance.errorMessage).toBe('Invalid data provided');
        expect(errorInstance.invalidFields).toEqual(['loanAmount', 'interestRate']);
    });

    test('should correctly log error message without invalid fields', () => {
        const errorInstance = new ErrorClass('SYSTEM_ERROR', 'Unexpected system failure', []);

        errorInstance.logError();

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error Code: SYSTEM_ERROR');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error Message: Unexpected system failure');
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining('Invalid Fields:'));
    });

    test('should correctly log error message with invalid fields', () => {
        const errorInstance = new ErrorClass('INPUT_ERROR', 'Invalid input data', ['loanAmount', 'fees']);

        errorInstance.logError();

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error Code: INPUT_ERROR');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error Message: Invalid input data');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid Fields: loanAmount, fees');
    });
});
