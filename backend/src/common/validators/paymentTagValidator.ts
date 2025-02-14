export const paymentTagValidator = (paymentTag: string) => {
  // payment tag can contain only alphanumeric characters and underscores and should be maximum of 10 characters

  if (!/^[a-zA-Z0-9_]{1,10}$/.test(paymentTag)) {
    return false;
  }
  return true;
};
