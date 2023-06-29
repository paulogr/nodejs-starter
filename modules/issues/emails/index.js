const path = require('node:path')

function issueEmailTemplate ({ utils }) {
  function renderCreateIssue (data) {
    return utils.email.render(path.join(__dirname, 'create-issue.mjml'), data)
  }

  return {
    renderCreateIssue
  }
}

module.exports = issueEmailTemplate