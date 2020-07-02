# pwngu

A tool to compare a plain text list of "pwned" passwords against a bcrypt hashed list of passwords.
For example, this can be useful for comparing a bcrypt hashed database list of passwords against a
list of common (and insecure) passwords (see
[data/PwnedPasswordsTop100k.txt](data/PwnedPasswordsTop100k.txt)). 

## Usage

1. Copy `.env.example` to `.env` and fill in the blanks

2. `npm run start` 

## Acknowledgments

A big thank you to Troy Hunt/Have I Been Pwned and the NCSC for releasing this list (available
[here](https://www.ncsc.gov.uk/static-assets/documents/PwnedPasswordsTop100k.txt)).

## License

Pwngu is released under the terms of the MIT license.
