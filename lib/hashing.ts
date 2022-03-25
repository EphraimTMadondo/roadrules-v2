// import * as bcrypt from 'bcryptjs';
import { compare, hash } from 'bcryptjs';

const saltRounds = 10;

export function passwordMatchesHash(password: string, hashedPassword: string) {
  return new Promise<boolean>((resolve, reject) => {
    compare(password, hashedPassword, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
}

export function createHashedPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    hash(password, saltRounds, (err, hashedPassword) => {
      if (err) return reject(err);

      return resolve(hashedPassword);
    });
  });
}
