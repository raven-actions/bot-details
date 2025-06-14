# 🤖 Bot Details Action

[![GitHub - marketplace](https://img.shields.io/badge/marketplace-bot--details-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/bot-details)
[![GitHub - release](https://img.shields.io/github/v/release/raven-actions/bot-details?style=flat-square)](https://github.com/raven-actions/bot-details/releases/latest)
[![GitHub - ci](https://img.shields.io/github/actions/workflow/status/raven-actions/bot-details/ci.yml?logo=github&label=CI&style=flat-square&branch=main&event=push)](https://github.com/raven-actions/bot-details/actions/workflows/ci.yml?query=branch%3Amain+event%3Apush)
[![GitHub - license](https://img.shields.io/github/license/raven-actions/bot-details?style=flat-square)](https://github.com/raven-actions/bot-details/blob/main/LICENSE)

---

This [GitHub Action](https://github.com/features/actions) allows you to quickly and easily get bot (GitHub App) basic details like name, email, author/committer, ... in a proper GitHub format to use in the subsequence steps for automation like git commit/push, open PR, etc.

- Action is platform-independent and tested on all the latest GitHub-hosted runners (`ubuntu-latest`, `macos-latest`, `windows-latest`).

## 📑 Table of Contents <!-- omit in toc -->

- [🛠️ Usage](#️-usage)
  - [Quick Start](#quick-start)
  - [Consume methods](#consume-methods)
    - [Action's output](#actions-output)
    - [Environment variables](#environment-variables)
  - [Example usage scenarios](#example-usage-scenarios)
    - [Git commit](#git-commit)
    - [Pull Request](#pull-request)
- [📥 Inputs](#-inputs)
- [📤 Outputs](#-outputs)
- [👥 Contributing](#-contributing)
- [🛡️ License](#️-license)

## 🛠️ Usage

### Quick Start

Just place in your GitHub workflow steps:

```yaml
- name: Bot Details
  id: bot-details
  uses: raven-actions/bot-details@v1

- name: Bot Details outputs
  run: |
    echo "ID: ${{ steps.bot-details.outputs.id }}"
    echo "Slug name: ${{ steps.bot-details.outputs.slug }}"
    echo "Display name: ${{ steps.bot-details.outputs.name }}"
    echo "Email: ${{ steps.bot-details.outputs.email }}"
    echo "Name Email: ${{ steps.bot-details.outputs.name-email }}"
    echo "HTML URL: ${{ steps.bot-details.outputs.html-url }}"
    echo "API URL: ${{ steps.bot-details.outputs.api-url }}"
```

Example output with default settings:

- ID: `41898282`
- Slug name: `github-actions`
- Display name: `github-actions[bot]`
- Email: `41898282+github-actions[bot]@users.noreply.github.com`
- Name Email: `github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>`
- HTML URL: `https://github.com/apps/github-actions`
- API URL: `https://api.github.com/users/github-actions%5Bbot%5D`

### Consume methods

#### Action's output

Use the action's output in the subsequence steps

```yaml
- name: Bot Details
  id: bot-details
  uses: raven-actions/bot-details@v1
  with:
    bot-slug-name: dependabot # (optional) if not specified then default one is 'github-actions'

- name: Bot Details outputs
  run: |
    echo "ID: ${{ steps.bot-details.outputs.id }}"
    echo "Slug name: ${{ steps.bot-details.outputs.slug }}"
    echo "Display name: ${{ steps.bot-details.outputs.name }}"
    echo "Email: ${{ steps.bot-details.outputs.email }}"
    echo "Name Email: ${{ steps.bot-details.outputs.name-email }}"
    echo "HTML URL: ${{ steps.bot-details.outputs.html-url }}"
    echo "API URL: ${{ steps.bot-details.outputs.api-url }}"
```

#### Environment variables

Use environment variables in the subsequence steps.

```yaml
- name: Bot Details
  uses: raven-actions/bot-details@v1
  with:
    bot-slug-name: my-gh-app # (optional) if not specified then default one is 'github-actions'

- name: Bot Details outputs
  run: |
    echo "ID: ${{ env.BOT_ID }}"
    echo "Slug name: ${{ env.BOT_SLUG }}"
    echo "Display name: ${{ env.BOT_NAME }}"
    echo "Email: ${{ env.BOT_EMAIL }}"
    echo "Name Email: ${{ env.BOT_NAME_EMAIL }}"
    echo "HTML URL: ${{ env.BOT_HTML_URL }}"
    echo "API URL: ${{ env.BOT_API_URL }}"
```

Use environment variables with custom environment prefix in the subsequence steps.

> Environment prefix will be upper-cased and striped from any special characters.
> A double underscore `__` is placed between environment prefix and env name.

```yaml
- name: Bot Details
  uses: raven-actions/bot-details@v1
  with:
    env-prefix: myEnvPrefix # (optional) if not specified then no prefix

- name: Bot Details outputs
  run: |
    echo "ID: ${{ env.MYENVPREFIX__BOT_ID }}"
    echo "Slug name: ${{ env.MYENVPREFIX__BOT_SLUG }}"
    echo "Display name: ${{ env.MYENVPREFIX__BOT_NAME }}"
    echo "Email: ${{ env.MYENVPREFIX__BOT_EMAIL }}"
    echo "Name Email: ${{ env.MYENVPREFIX__BOT_NAME_EMAIL }}"
    echo "HTML URL: ${{ env.MYENVPREFIX__BOT_HTML_URL }}"
    echo "API URL: ${{ env.MYENVPREFIX__BOT_API_URL }}"
```

### Example usage scenarios

Below are examples based on existing actions.

#### Git commit

Example with [Git Auto Commit](https://github.com/marketplace/actions/git-auto-commit) action.

```yaml
- name: Git Auto Commit
  uses: stefanzweifel/git-auto-commit-action@v6
  with:
    commit_user_name: ${{ steps.bot-details.outputs.name }}
    commit_user_email: ${{ steps.bot-details.outputs.email }}
    commit_author: ${{ steps.bot-details.outputs.name-email }}
```

#### Pull Request

Example with [Create Pull Request](https://github.com/marketplace/actions/create-pull-request) action.

```yaml
- name: Create Pull Request
  uses: peter-evans/create-pull-request@v7
  with:
    committer: ${{ steps.bot-details.outputs.name-email }}
    author: ${{ steps.bot-details.outputs.name-email }}
```

## 📥 Inputs

|      Name       | Required |   Type   |     Default      | Description                                |
|:---------------:|:--------:|:--------:|:----------------:|:-------------------------------------------|
| `bot-slug-name` |  false   | `string` | `github-actions` | Bot slug name (GitHub App name)            |
|  `env-prefix`   |  false   | `string` |    *not set*     | Prefix for environment variables           |
| `github-token`  |  false   | `string` |  `github.token`  | GitHub token to use for API authentication |

## 📤 Outputs

|     Name     |   Type   | Description                         |
|:------------:|:--------:|:------------------------------------|
|     `id`     | `number` | Bot ID                              |
|    `slug`    | `string` | Bot slug name                       |
|    `name`    | `string` | Bot display name                    |
|   `email`    | `string` | Bot GitHub formatted email          |
| `name-email` | `string` | Bot GitHub formatted name and email |
|  `html-url`  | `string` | Bot HTML URL                        |
|  `api-url`   | `string` | Bot API URL                         |

## 👥 Contributing

Contributions to the project are welcome! Please follow [Contributing Guide](https://github.com/raven-actions/bot-details/blob/main/.github/CONTRIBUTING.md).

## 🛡️ License

This project is distributed under the terms of the [MIT](https://github.com/raven-actions/bot-details/blob/main/LICENSE) license.
