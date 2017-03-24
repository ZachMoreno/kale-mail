(() => {
    'use strict';

    const express    = require('express'),
          bodyParser = require('body-parser'),
          config     = require('./config'),
          helper     = require('sendgrid').mail,
          sg         = require('sendgrid')(config.sendgrid.apikey),
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
                    message: 'all good',
                    details: sgRes
                });
            }
        });
    });

    kaleMail.listen(config.server.port, () => {
        console.log('kale-mail is up @ http://' + config.server.ip + ':' + config.server.port);
    });
})();
