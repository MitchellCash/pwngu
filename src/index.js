const fs = require('fs');
const readline = require('readline');
const workerFarm = require('worker-farm');
const workers = workerFarm(require.resolve('./passwordComparisonWorker'));

// Read in environment variables.
require('dotenv').config()

/**
 * Pass in a file path and return an array of lines in the file.
 *
 * @param filePath
 * @returns {Promise<[string]>}
 */
async function loadFile(filePath) {
  const file = fs.createReadStream(filePath);

  const fileRl = readline.createInterface({
    input: file,
    crlfDelay: Infinity
  });

  const lines = [];
  for await (const line of fileRl) {
    if (line) {
      lines.push(line);
    }
  }

  return lines;
}

/**
 * Runs a comparison of plain text passwords against a list of bcrypt hashed passwords.
 *
 * @returns {Promise<[string]>}
 */
async function findPwnedPasswords() {
  return new Promise(async function (resolve, reject) {
    console.time('Time elapsed');

    const plainTextPasswordFile = process.env.PLAIN_TEXT_PASSWORD_FILE || 'data/PwnedPasswordsTop100k.txt';
    const plainTextPasswordList = await loadFile(plainTextPasswordFile);
    const hashedPasswordList = await loadFile(process.env.HASHED_PASSWORD_FILE);

    let processed = 0;
    let pwned = 0;

    hashedPasswordList.forEach((hashedPassword) => {
      plainTextPasswordList.forEach((plainTextPassword) => {
        // Hashed password comparisons are computationally expensive and Node.js for all intents
        // and purposes is single threaded. We have a lot of password comparisons to get through
        // so instead of blocking a single thread for each comparison we can spawn multiple workers
        // per core.
        workers(plainTextPassword, hashedPassword, function (res) {
          // Tally the number of pwned passwords we find.
          if (res) {
              pwned += 1;
          }

          // Once the number of processed comparisons equals the number of hashed passwords
          // multiplied by the number of plain text passwords we can end the worker farm and
          // resolve the promise.
          if (++processed === hashedPasswordList.length * plainTextPasswordList.length) {
            workerFarm.end(workers);
            console.timeEnd('Time elapsed');
            resolve([pwned, hashedPasswordList.length]);
          }
        });
      });
    });
  });
}

findPwnedPasswords().then((res) => {
  console.log(`Results: ${res[0]} / ${res[1]} pwned passwords`);
  console.log("Pwngu password comparison complete!")
});
