(() => {
    'use strict';

    const express    = require('express'),
          bodyParser = require('body-parser'),
          helper     = require('sendgrid').mail,
          sg         = require('sendgrid')('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'),
          kaleMail   = express();

    kaleMail.use(bodyParser.json());
    kaleMail.use(bodyParser.urlencoded({ extended: false }));

    kaleMail.post('/api/v1/email', (req, res) => {
        var from_email = new helper.Email(req.body.from),
            to_email   = new helper.Email(req.body.to),
            subject    = req.body.subject,
            content    = new helper.Content("text/plain", req.body.content),
            mail       = new helper.Mail(from_email, subject, to_email, content),
            request    = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

        sg.API(request, (error, sgRes) => {
            if(!error) {
                res.status(200).send({
                    message: 'all good'
                });
            }
        });
    });

    kaleMail.listen('8080', () => {
        console.log('magic happens here');
    });
})();
