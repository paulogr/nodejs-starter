const fs = require('node:fs/promises')
const mjml = require('mjml')
const nunjucks = require('nunjucks')

function emailUtils ({ config }) {
  async function render (file, data) {
    const template = await fs.readFile(file, { encoding: 'utf-8' })
    const { html } = mjml(template)
    return nunjucks.renderString(html, Object.assign({ config }, data))
  }

  return {
    render
  }
}

module.exports = emailUtils