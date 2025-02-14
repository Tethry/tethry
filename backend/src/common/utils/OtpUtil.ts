const OTP_LENGTH = 6;
export const OTP_EXPIRY_TIME = 10 * 60 * 1000;

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
    .toString()
    .slice(0, OTP_LENGTH);
};

export const isOtpValid = (otp: string, userOtp: string) => {
  return otp === userOtp;
};

export const isOtpExpired = (otpExpiry: Date) => {
  return Date.now() - otpExpiry.getTime() > OTP_EXPIRY_TIME;
};
