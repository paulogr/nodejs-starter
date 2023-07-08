const { gql, GraphQLClient } = require('graphql-request')

function pipefyIntegrationService({ config, logger }) {
  const client = new GraphQLClient(config.integrations.pipefy.endpoint, {
    headers: {
      authorization: `Bearer ${config.integrations.pipefy.apiKey}`
    }
  })

  async function getCardById (id) {
    const data = await client.request(
      gql`
        { 
          card(id: ${id}) { 
            id
            title
            current_phase {
              id
              name
            }
            assignees {
              id
              name
              email
            }
            pipe {
              id
              name
            }
            fields {
              value
              field {
                  id
              }
            }
            child_relations {
              cards {
                id
                current_phase {
                  id
                  name
                }
              }
              source_type
            }
            inbox_emails {
              id
              message_id
              from
              fromName
              cc
              subject,
              type
            }
            created_at
            updated_at
          }
        }
      `
     )

    return data.card
  }

  function getFieldValueById (card, id) {
    const field = card.fields.find(f => f.field.id === id)
    return field.value
  }

  function getLatestEmail (card) {
    return card.inbox_emails[card.inbox_emails.length - 1]
  }

  return {
    getCardById,
    getFieldValueById,
    getLatestEmail
  }
}

module.exports = pipefyIntegrationService