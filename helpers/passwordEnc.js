const bcrypt = require("bcrypt");
const PasswordEncryption = async (password) => {
  const saltRounds = 10;

  const saltedData = await bcrypt.genSalt(saltRounds);
  const encryptedPassword = await bcrypt.hash(password, saltedData);

  return encryptedPassword;
};

const passwordComparison = async (password, hashPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashPassword);
  return isPasswordValid;
};

module.exports = { PasswordEncryption, passwordComparison };
