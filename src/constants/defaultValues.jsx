import pkg from '../../package.json';

export const name = pkg.name;
export const baseroot = '/album-web';
export const appRoot = '/app';
export const userStorageKey = `${name}_current_user`;
export const tokenStorageKey = `${name}_current_token`;
export const accountsKey = `${name}_accounts`;
export const albunsKey = `${name}_albuns`;