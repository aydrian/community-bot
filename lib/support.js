'use strict';
let _ = require('lodash');

module.exports = {
  init: function(controller) {
    controller.hears('support create ticket', 'direct_message,direct_mention', (bot, message) => {
      //let user = bot.api.users.info(message.user)
      //console.log(user)

      bot.startConversation(message, function(err, convo) {
        if (!err) {
          convo.ask(`Hello, let me assist you in creating your support ticket. First, what is your name?`,
              (response, convo) => {
                convo.next();
              }, {'key': 'name'})

          convo.ask(`What is your email?`,
              (response, convo) => {
                convo.next();
              }, {'key': 'email'})

          convo.ask(`What is your Account ID?\n (You can find this on your Profile Page https://app.sparkpost.com/account/profile)`,
              (response, convo) => {
                convo.next();
              }, {'key': 'accountID'})

          convo.ask(`In a few words, please describe you problem.`,
              (response, convo) => {
                convo.next();
              }, {'key': 'subject'})

          convo.ask(`Please provide any additional details.`,
              (response, convo) => {
                convo.next();
              }, {'key': 'message'})

          //convo.say('Okay, I have the following info');

          //let results = convo.extractResponses();
          //console.log(results);

          //let arrResults = _(results).map( (value, key) => `${key}: ${value}`);
          //convo.say(arrResults.join('\n'))

          /*convo.ask('Would you like to creat this ticket?', [
              {
                  pattern: 'yes',
                  callback: function(response, convo) {
                      // since no further messages are queued after this,
                      // the conversation will end naturally with status == 'completed'
                      convo.next();
                  }
              },
              {
                  pattern: 'no',
                  callback: function(response, convo) {
                      // stop the conversation. this will cause it to end with status == 'stopped'
                      convo.stop();
                  }
              },
              {
                  default: true,
                  callback: function(response, convo) {
                      convo.repeat();
                      convo.next();
                  }
              }
          ]);*/


          convo.on('end', (convo) => {
            if (convo.status == 'completed') {
              bot.reply(message, 'Results');

              let results = convo.extractResponses();
              console.log(results);
              let arrResults = _(results).map( (value, key) => { return `${key}: ${value}`});
              console.log(arrResults);
              bot.say(arrResults.join('\n'))
              //var name = convo.extractResponse('name');
              //bot.reply(message, `Your name is ${name}`);

            } else {
              // this happens if the conversation ended prematurely for some reason
              bot.reply(message, 'OK, nevermind!');
            }
          })
        }
      })
    })
  },
  help: {
    command: 'support',
    text: (helpConfig) => {
      return '`@' + helpConfig.botName + ' support create ticket`: Create a SparkPost Support Ticket';
    }
  }
}
