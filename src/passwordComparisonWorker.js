const bcrypt = require('bcryptjs');

module.exports = async function (clearPass, encryptedPass, callback) {
  // Add any plain-text password prefix or suffix that can sometimes be added to a password before
  // hashing.
  const fullClearPass = process.env.PASSWORD_PREFIX + clearPass + process.env.PASSWORD_SUFFIX;

  // Different versions of bcrypt have different prefixes (e.g. some PHP apps will use the $2y$
  // prefix, but the Node.js version expects $2a$).
  // const processedEncryptedPass = encryptedPass.toString().replace('[$2b$]|[$2x$]|[$2y$]', '$2a$');

  // Compare the plain text and encrypted password.
  const isPwned = await bcrypt.compare(fullClearPass, encryptedPass);

  // If there is a match log the result.
  if (isPwned && process.env.NODE_ENV !== 'test') {
    console.log(`Password hash is pwned: ${encryptedPass}`);
    console.log(`Password is: ${clearPass}`);
    console.log();
  }

  callback(isPwned);
}
