const nextEnv = require('next-env');
require('dotenv').config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};
const withNextEnv = nextEnv();
module.exports = withNextEnv({...nextConfig });
