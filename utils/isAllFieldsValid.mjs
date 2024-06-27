export const isAllFieldsValid = (email, username, password) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // starts with any letter, -, ., with an @ symbol, any letter, ., any ending between 2-4 letters

  const passwordRegex = /[A-Z]+[a-z]+[0-9]+[!@£$%^&*()¡€#¢∞§¶•ªº|><]/g;
  // has atleast one uppercase letter, one digit, one special character

  const usernameRegex = /^[A-Za-z]{5,}\d*$/g;
  // 5+ length, starts with a letter, no special characters, includes a number

  if (
    emailRegex.test(email) &&
    passwordRegex.test(password) &&
    usernameRegex.test(username)
  ) {
    return true;
  } else {
    return false;
  }
};
