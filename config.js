module.exports.twitter = {
  consumer_key: `${process.env.API_KEY}`,
  consumer_secret: `${process.env.API_SECRET_KEY}`,
  access_token_key: `${process.env.ACCESS_TOKEN}`,
  access_token_secret: `${process.env.ACCESS_TOKEN_SECRET}`,
}

module.exports.webhooks = {
  serverUrl: `${process.env.SERVER_URL}`,
  route: `${process.env.ROUTE}`,
  consumerKey: `${process.env.API_KEY}`,
  consumerSecret: `${process.env.API_SECRET_KEY}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessTokenSecret: `${process.env.ACCESS_TOKEN_SECRET}`,
  environment: `${process.env.ENVIRONMENT}`,
}
module.exports.webhooksUserActivity = {
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessTokenSecret: `${process.env.ACCESS_TOKEN_SECRET}`,
}
