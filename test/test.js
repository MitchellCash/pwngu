const { resolve } = require('path')
const isPasswordPwned = require('../src/passwordComparisonWorker');

// Read in environment variables.
require('dotenv').config({
    path: resolve(__dirname, '../.env.test')
})

describe('Password comparison tests', () => {
  test('password is pwned should return true', async () => {
    const plainTextPassword = 'CorrectHorseBatteryStaple';
    const hashedPassword = '$2a$10$8zuUHLLLrbgdZMLZ.X0.6.5O8tdHdVo0hTjiwmmTqk8ZTsZoWFzEq';
    await isPasswordPwned(plainTextPassword, hashedPassword, (res) => {
      expect(res).toBe(true)
    });
  });

  test('password is not pwned should return false', async () => {
    const plainTextPassword = '12345678';
    const hashedPassword = '$2a$10$8zuUHLLLrbgdZMLZ.X0.6.5O8tdHdVo0hTjiwmmTqk8ZTsZoWFzEq';
    await isPasswordPwned(plainTextPassword, hashedPassword, (res) => {
      expect(res).toBe(false)
    });
  });

    test('crypt_blowfish hashed password (version $2y$) is pwned should return true', async () => {
        const plainTextPassword = 'CorrectHorseBatteryStaple';
        const hashedPassword = '$2y$10$8zuUHLLLrbgdZMLZ.X0.6.5O8tdHdVo0hTjiwmmTqk8ZTsZoWFzEq';
        await isPasswordPwned(plainTextPassword, hashedPassword, (res) => {
            expect(res).toBe(true)
        });
    });

    test('crypt_blowfish hashed password (version $2y$) is not pwned should return false', async () => {
        const plainTextPassword = '12345678';
        const hashedPassword = '$2y$10$8zuUHLLLrbgdZMLZ.X0.6.5O8tdHdVo0hTjiwmmTqk8ZTsZoWFzEq';
        await isPasswordPwned(plainTextPassword, hashedPassword, (res) => {
            expect(res).toBe(false)
        });
    });

    test('OpenBSD bcrypt hashed password (version $2b$) is pwned should return true', async () => {
        const plainTextPassword = 'CorrectHorseBatteryStaple';
        const hashedPassword = '$2b$10$8zuUHLLLrbgdZMLZ.X0.6.5O8tdHdVo0hTjiwmmTqk8ZTsZoWFzEq';
        await isPasswordPwned(plainTextPassword, hashedPassword, (res) => {
            expect(res).toBe(true)
        });
    });

    test('OpenBSD bcrypt hashed password (version $2b$) is not pwned should return false', async () => {
        const plainTextPassword = '12345678';
        const hashedPassword = '$2b$10$8zuUHLLLrbgdZMLZ.X0.6.5O8tdHdVo0hTjiwmmTqk8ZTsZoWFzEq';
        await isPasswordPwned(plainTextPassword, hashedPassword, (res) => {
            expect(res).toBe(false)
        });
    });
});
