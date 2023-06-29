const nodemailer = require('nodemailer')

function email ({ config }) {
  const transporter = nodemailer.createTransport({ host: "localhost", port: 1025, secure: false })

  function send (to, subject, html) {
    return transporter.sendMail({ from: config.email.from, to, subject, html })
  }

  return {
    send
  }
}

module.exports = email