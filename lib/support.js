'use strict';

module.exports = {
  init: function(controller) {
    controller.hears('support whoami', 'direct_message,direct_mention', (bot, message) => {
      bot.api.users.info({user: message.user}, (err, json) => {
        let user = json.user;

        bot.reply(message, '```\n' + JSON.stringify(user, null, 2) + '\n```');
      });
    });

    controller.hears('support create ticket', 'direct_message,direct_mention', (bot, message) => {

      bot.api.users.info({user: message.user}, (err, json) => {
        let user = json.user;

        let confirmEmail = (response, convo) => {
          convo.ask(`I have your email as ${user.profile.email}, would you like to use it?`, [
            {
              pattern: bot.utterances.yes,
              callback: (response, convo) => {
                response.text = user.profile.email;
                askAcountID(response, convo);
                convo.next();
              }
            },
            {
              pattern: bot.utterances.no,
              callback: (response, convo) => {
                askEmail(response, convo);
                convo.next();
              }
            },
            {
              default: true,
              callback: (response, convo) => {
                convo.repeat();
                convo.next();
              }
            }
          ], {'key': 'email'});
        };

        let askEmail = (response, convo) => {
          convo.ask('Which email shall I use?', (response, convo) => {
            askAcountID(response, convo);
            convo.next();
          }, {'key': 'email'});
        };

        let askAcountID = (response, convo) => {
          convo.ask(`What is the SparkPost Account ID?\n (You can find this on your Profile Page https://app.sparkpost.com/account/profile)`,
              (response, convo) => {
                askSubject(response, convo);
                convo.next();
              }, {'key': 'accountID'});
        };

        let askSubject = (response, convo) => {
          convo.ask('In a few words, please describe your problem.',
              (response, convo) => {
                askMessage(response, convo);
                convo.next();
              }, {'key': 'subject'});
        };

        let askMessage = (response, convo) => {
          convo.ask('Please provide any additional details.',
              (response, convo) => {
                convo.next();
              }, {'key': 'message'});
        };

        let askName = (response, convo) => {
          convo.ask('Which name shall I use?', (response, convo) => {
            askEmail(response, convo);
            convo.next();
          }, {'key': 'name'});
        };

        bot.startConversation(message, (err, convo) => {
          if (!err) {
            convo.say(`Hello ${user.profile.first_name}, let me assist you in creating your support ticket.`);
            convo.ask(`Would you like to create this ticket as yourself (${user.profile.real_name})?`, [
              {
                pattern: bot.utterances.yes,
                callback: (response, convo) => {
                  response.text = user.profile.real_name;
                  confirmEmail(response, convo);
                  convo.next();
                }
              },
              {
                pattern: bot.utterances.no,
                callback: (response, convo) => {
                  askName(response, convo);
                  convo.next();
                }
              },
              {
                default: true,
                callback: (response, convo) => {
                  convo.repeat();
                  convo.next();
                }
              }
            ], {'key': 'name'});

            convo.on('end', (convo) => {
              if (convo.status === 'completed') {
                bot.reply(message, 'Results');

                let results = convo.extractResponses();

                console.log(results);
                bot.reply(message, '```\n' + JSON.stringify(results, null, 2) + '\n```');
              } else {
                // this happens if the conversation ended prematurely for some reason
                bot.reply(message, 'OK, nevermind!');
              }
            });
          }
        });
      });
    });
  },
  help: {
    command: 'support',
    text: (helpConfig) => {
      return '`@' + helpConfig.botName + ' support create ticket`: Create a SparkPost Support Ticket';
    }
  }
};
