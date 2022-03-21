/* eslint-disable no-undef */
import { config } from 'dotenv';
import { resolve } from 'path';

config({
    path: resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 5000;