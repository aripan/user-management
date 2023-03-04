export const useValidateEmail = (email: string): boolean => {
    // regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

 export const useCheckPasswordStrength = (password: string): boolean => {
    // regular expression for checking strong password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#+?&])[A-Za-z\d@$!%*#+?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }