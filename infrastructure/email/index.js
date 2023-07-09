const nodemailer = require('nodemailer')

function email ({ config }) {
  const transporter = nodemailer.createTransport({
    host: config.email.smtp.host,
    port: config.email.smtp.port, 
    auth: {
      user: config.email.smtp.username,
      pass: config.email.smtp.password
    },
    secure: config.isProduction
  })

  function send (to, subject, html, replyTo, references) {
    return transporter.sendMail({ from: config.email.from, to, subject, html, replyTo, inReplyTo: references, references })
  }

  return {
    send
  }
}

module.exports = email