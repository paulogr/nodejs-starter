function issuePipefyJobs ({ worker, issueEmailTemplate, email, integrations }) {
  const FIELD_ID = {
    ENDERECO_DE_EMAIL: 'endere_o_de_email',
    CRIADO_POR: 'criado_por'
  }

  const EMAIL_SUBJECT = {
    CARD_CREATE: "Recebemos seu atendimento."
  }

  async function cardCreate ({ data }) {
    const card = await integrations.pipefy.getCardById(data.card.id)

    const name = integrations.pipefy.getFieldValueById(card, FIELD_ID.CRIADO_POR)
    const address = integrations.pipefy.getFieldValueById(card, FIELD_ID.ENDERECO_DE_EMAIL)

    const html = await issueEmailTemplate.renderCreateIssue({ name, card })
    await email.send({ name, address }, EMAIL_SUBJECT.CARD_CREATE, html)
  }

  worker.work('issues:card.create', cardCreate)
}

module.exports = issuePipefyJobs