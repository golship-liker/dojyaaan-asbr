const nextEnv = require('next-env');
require('dotenv').config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
        }]
    }
};
const withNextEnv = nextEnv();
module.exports = withNextEnv({...nextConfig,
    env: {
        FB_PROJECTID: process.env.FB_PROJECTID,
        FB_AUTHDOMAIN: process.env.FB_AUTHDOMAIN,
        FB_APIKEY: process.env.FB_APIKEY,
        FB_STORAGEBUCKET: process.env.FB_STORAGEBUCKET,
        FB_MESSAGINGSENDERID: process.env.FB_MESSAGINGSENDERID,
        FB_APPID: process.env.FB_APPID,
        FB_MEASUREMENTID: process.env.FB_MEASUREMENTID
    }
});