const path = require('node:path')

function issuePipefyJobs ({ worker, email, integrations, utils }) {
  const FIELD_ID = {
    ENDERECO_DE_EMAIL: 'endere_o_de_email',
    CRIADO_POR: 'criado_por'
  }

  async function pipefy ({ data }) {
    const card = await integrations.pipefy.getCardById(data.card.id)

    const name = integrations.pipefy.getFieldValueById(card, FIELD_ID.CRIADO_POR)
    const address = integrations.pipefy.getFieldValueById(card, FIELD_ID.ENDERECO_DE_EMAIL)
    const latestEmail = integrations.pipefy.getLatestEmail(card)
    
    const to = { name, address }
    const subject = latestEmail.subject.startsWith('Re:') ? latestEmail.subject : `Re: ${latestEmail.subject}`
    const html = await utils.email.render(path.join(__dirname, `../emails/${data.action}.mjml`), data)
    const replyTo = `pipe${card.pipe.id}+${card.suid}@mail.pipefy.com`
    const references = latestEmail.message_id

    await email.send(to, subject, html, replyTo, references)
  }

  worker.work('issues:pipefy', pipefy)
}

module.exports = issuePipefyJobs