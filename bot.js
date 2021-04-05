require('dotenv').config()

const express = require('express')
const Twitter = require('twitter-lite')
const twitterWebhooks = require('twitter-webhooks')

const { twitter, webhooks, webhooksUserActivity } = require('./config')

const twitterLiteClient = new Twitter({ ...twitter })

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userActivityWebhook = twitterWebhooks.userActivity({
  ...webhooks,
  app,
})

;(async function () {
  //  get user id
  const result = await twitterLiteClient.get('users/lookup', {
    screen_name: 'proDankMemer',
  })
  const userId = result[0].id_str

  //     get webhooks
  const webhooksResult = await userActivityWebhook.getWebhooks()

  if (webhooksResult.environments[0].webhooks.length !== 0) {
    //  unregister earlier webhook
    const webhookId = webhooksResult.environments[0].webhooks[0].id
    await userActivityWebhook.unregister({
      webhookId,
    })
  }

  //Register your webhook url - just needed once per URL
  await userActivityWebhook.register()

  //Subscribe for a particular user activity
  userActivityWebhook
    .subscribe({
      ...webhooksUserActivity,
      userId,
    })
    .then(function (userActivity) {
      userActivity
        .on('follow', async data => {
          const followerName = data.source.screen_name
          const followerId = data.source.id

          console.log(`\n ${followerName} followed you \n`)
          try {
            await twitterLiteClient.post('direct_messages/events/new', {
              event: {
                type: 'message_create',
                message_create: {
                  target: {
                    recipient_id: followerId,
                  },
                  message_data: {
                    text: `Hey ${followerName}! Thanks for following. You are awesome`,
                  },
                },
              },
            })
          } catch (err) {
            console.error(err)
          }
        })
        .on('favorite', async data => {
          const followerName = data.user.screen_name
          const followerId = data.user.id_str

          console.log(`\n ${followerName} liked a tweet\n`)

          try {
            await twitterLiteClient.post('direct_messages/events/new', {
              event: {
                type: 'message_create',
                message_create: {
                  target: {
                    recipient_id: followerId,
                  },
                  message_data: {
                    text: `Hey ${followerName}! Thanks for liking the tweet`,
                  },
                },
              },
            })
          } catch (err) {
            console.error(err)
          }
        })
    })
    .catch(console.error)
})()

app.listen(process.env.PORT || 3004)
