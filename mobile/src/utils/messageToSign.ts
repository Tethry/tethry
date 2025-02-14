export const messageToSign = (nonce: string) => {
  return ` Welcome to Tethry! \n \nPlease sign this message to complete authentication. Your signature verifies that you’re the owner of this wallet. \n \nThis request will not trigger a transaction or cost you anything. Nonce: ${nonce}`;
};
