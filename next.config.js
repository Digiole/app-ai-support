module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    MY_ACCESS_KEY: process.env.MY_ACCESS_KEY,
    MY_SECRET_KEY: process.env.MY_SECRET_KEY,
    MY_REGION: process.env.MY_REGION,
    NEXT_PUBLIC_CONTENT_LANGUAGE: process.env.NEXT_PUBLIC_CONTENT_LANGUAGE,
    NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    APP_ID: process.env.APP_ID,
    MIDDLEWARE_API_URL: process.env.MIDDLEWARE_API_URL,
    AI_SUPPORT_WEB: process.env.AI_SUPPORT_WEB,
    AI_SUPPORT_USERS_TABLE: process.env.AI_SUPPORT_USERS_TABLE,
    NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_DEV,
  }
}