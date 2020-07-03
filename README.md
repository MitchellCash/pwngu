# pwngu

A tool to compare a plain text list of "pwned" passwords against a bcrypt hashed list of passwords.
For example, this can be useful for comparing a bcrypt hashed database list of passwords against a
list of common (and insecure) passwords (see
[data/PwnedPasswordsTop100k.txt](data/PwnedPasswordsTop100k.txt)). 

Why is it called **pwngu**? I was thinking of the penguin Pingu at the time....

## Usage

1. Copy `.env.example` to `.env` and fill in the blanks

2. `npm run start` 

⚠️ **Before you get started:**

Password comparisons are computationally expensive and to compare even a list of 1,000 hashed
passwords against the default 100,000 pwned password list can take hours, if not days, depending on
your machine. Node.js for all intents and purposes is single threaded, so to help mitigate this, we
spin up our own set of child processes (equal to number of CPU cores) to run password comparisons
in parallel. This significantly reduces the time to complete a full run, however, a common
account-oriented website might have 10,000+ hashed passwords and unless you have a very powerful
machine, you can still expect this to take a while to complete. It is recommended to test a single
hashed password to get an idea of how long a full data set might take to complete on your machine.

## Acknowledgments

A big thank you to Troy Hunt/Have I Been Pwned and the NCSC for releasing this list (available
[here](https://www.ncsc.gov.uk/static-assets/documents/PwnedPasswordsTop100k.txt)).

## License

Pwngu is released under the terms of the MIT license.
