module.exports = async ({ github, core }) => {
  try {
    // Get inputs
    const botSlugName = core.getInput('bot_slug_name') || 'github-actions'
    const setEnv = core.getBooleanInput('set_env') || false
    let envPrefix = core.getInput('env_prefix')

    // Format environment prefix if required
    if (setEnv && envPrefix) {
      envPrefix = envPrefix.replace(/[^a-z0-9]/gi, '').toUpperCase()
      envPrefix = `${envPrefix}__`
      core.debug(`envPrefix: ${envPrefix}`)
    }

    // Define constants for bot details
    const botName = `${botSlugName}[bot]`

    // Fetch bot details from GitHub API
    const { data } = await github.rest.users.getByUsername({
      username: botName
    })

    // Extract bot details
    const botId = data.id
    const botEmail = `${botId}+${botName}@users.noreply.github.com`
    const botNameEmail = `${botName} <${botEmail}>`
    const botHtmlUrl = data.html_url
    const botApiUrl = data.url

    // Function to set output and export variable if required
    const setOutputAndExportVariable = (name, value) => {
      core.debug(`${name}: ${value}`)
      core.setOutput(name, value)

      if (setEnv) {
        const env = `${envPrefix}BOT_${name.toUpperCase()}`
        core.debug(`${env}: ${value}`)
        core.exportVariable(env, value)
      }
    }

    // Set outputs and export variables
    setOutputAndExportVariable('id', botId)
    setOutputAndExportVariable('slug', botSlugName)
    setOutputAndExportVariable('name', botName)
    setOutputAndExportVariable('email', botEmail)
    setOutputAndExportVariable('name_email', botNameEmail)
    setOutputAndExportVariable('html_url', botHtmlUrl)
    setOutputAndExportVariable('api_url', botApiUrl)
  } catch (error) {
    core.setFailed(error.message)
  }
}
