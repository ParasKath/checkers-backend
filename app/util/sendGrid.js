const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = async (to, subject, html) => {

    const message = {
        to: to, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: subject,
        html: html,
    }


    return sgMail
    .send(message)
    .then(() => {
        console.log('Email sent')
        return { "sent" : true }
    })
    .catch((error) => {
        console.error(JSON.stringify(error))
        return { "sent" : false }
    })
};