import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: 'kyousayblog',
    apiKey: process.env.API_KEY as string,
})