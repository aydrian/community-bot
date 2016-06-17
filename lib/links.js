'use strict';

var links = [
  { "url": "https://support.sparkpost.com/customer/portal/emails/new", "tags": ["create", "ticket"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/topics/770787-getting-started/articles", "tags": ["started"] },
  { "url": "https://support.sparkpost.com/customer/portal/articles/1976204-webhook-event-reference", "tags": ["webhook", "event"] },
  { "url": "https://support.sparkpost.com/customer/portal/articles/1933318-create-and-verify-sending-domains", "tags": ["sending", "domain"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/2139249-enabling-multiple-custom-tracking-domains", "tags": ["tracking", "domain"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/2371794-requesting-a-custom-bounce-domain", "tags": ["bounce", "domain"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/2214831-sending-attachments-in-sparkpost-and-sparkpost-elite", "tags": ["attachment"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/2429473-smtp-and-rest-api-injection-best-practices-for-improved-performance", "tags": ["smtp", "rest"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/2249268-transmission-best-practices", "tags": ["transmission"] },
  { "url": "https://support.sparkpost.com/customer/portal/articles/1929891-using-suppression-lists", "tags": ["suppression"] },
  { "url": "https://support.sparkpost.com/customer/portal/articles/2035563", "tags": ["bounce", "report"] },
  { "url": "https://support.sparkpost.com/customer/portal/articles/2396826-optimizing-deliverability-and-inbox-placement", "tags": ["deliverability"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/2241721-how-are-messages-retried-in-sparkpost-and-sparkpost-elite-", "tags": ["retry"] },
  { "url": "https://support.sparkpost.com/customer/en/portal/articles/1933360-verify-sending-domains", "tags": ["sending", "domain"] },
  { "url": "https://www.sparkpost.com/blog/differences-sending-smtp-api/", "tags": ["smtp", "api"] },
  { "url": "https://www.sparkpost.com/blog/sparkpost-email-infrastructure-tech-stack/", "tags": ["stack"] },
  { "url": "https://www.sparkpost.com/blog/6-rules-maximum-outlook-deliverability/", "tags": ["outlook", "deliverability", "hotmail"] },
  { "url": "https://www.sparkpost.com/blog/email-journey-inbox/", "tags": ["deliverability", "security"] },
  { "url": "https://www.sparkpost.com/blog/forwarding-inbound-email-with-heroku/", "tags": ["inbound", "forward"] },
  { "url": "https://www.sparkpost.com/blog/dmarc-howto/", "tags": ["dmarc", "security"] },
  { "url": "https://www.sparkpost.com/blog/how-to-run-sparkpost-postman/", "tags": ["postman"] },
  { "url": "https://www.sparkpost.com/blog/mandrill-template-migration-tool-mst3k/", "tags": ["template", "migrate"] },
  { "url": "https://www.sparkpost.com/blog/advanced-email-templates/", "tags": ["template"] },
  { "url": "https://www.sparkpost.com/blog/automatic-css-inlining-sparkpost/", "tags": ["css"] },
  { "url": "https://www.sparkpost.com/blog/why-feedback-loops-matter/", "tags": ["fbl"] },
  { "url": "https://www.sparkpost.com/blog/run-sparkpost-postman/", "tags": ["postman"] },
  { "url": "https://www.sparkpost.com/blog/email-deliverability-crash-course/", "tags": ["deliverability"] },
  { "url": "https://www.sparkpost.com/blog/what-are-feedback-loops/", "tags": ["fbl"] },
  { "url": "https://www.sparkpost.com/blog/my-promise-to-developers-sparkpost-pricing/", "tags": ["pricing", "mandrill"] },
  { "url": "https://www.sparkpost.com/blog/mandrill-heroku-alternative-migrating-from-mandrill-to-sparkpost-on-heroku/", "tags": ["heroku", "smtp"] },
  { "url": "https://www.sparkpost.com/blog/why-sparkpost-can-offer-100k-free-emails-per-month/", "tags": ["pricing", "free"] },
  { "url": "https://www.sparkpost.com/blog/mandrill-alternative-sparkpost-survival-guide/", "tags": ["mandrill", "survival"] },
  { "url": "https://www.sparkpost.com/blog/time-for-dmarc-email-authentication/", "tags": ["dmarc"] },
  { "url": "https://www.sparkpost.com/blog/three-dkim-challenges-valimail-guest/#", "tags": ["dkim", "deliverability"] },
  { "url": "https://www.sparkpost.com/blog/spam-traps-part-1-what-are-they/", "tags": ["spam", "trap"] },
  { "url": "https://www.sparkpost.com/blog/spam-traps-part-2-impact-mail-program/", "tags": ["spam", "trap"] },
  { "url": "https://www.sparkpost.com/blog/blocked-blacklisted-email/", "tags": ["deliverability", "block"] },
  { "url": "https://www.sparkpost.com/blog/webhooks-beyond-the-basics/", "tags": ["webhook"] },
  { "url": "https://www.sparkpost.com/blog/new-api-feature-message-events/", "tags": ["events"] },
  { "url": "https://www.sparkpost.com/blog/understanding-spf-and-dkim-in-sixth-grade-english/", "tags": ["dkim", "auth"] }
];

module.exports = {
  init: function(controller) {
    controller.hears('link (.*)$', 'direct_message,direct_mention', (bot, message) => {
      var searchStr = message.match[1];
      var tokens = searchStr.split(/\s+/);
      var l = links.filter(function(link) {
          var match = false;
          var t = tokens.filter(function(token) {
            if (link.url.indexOf(token) >= 0) {
              match = true;
            }
          });
          return match;
      }).map(function(link) {
        return link.url
      });
      return bot.reply(message, "\n"+ l.join("\n") +"\n");
    });
  }
};
