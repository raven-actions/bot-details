# 🤖 Bot Details Action

[![GitHub - marketplace](https://img.shields.io/badge/marketplace-bot--details-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/bot-details)
[![GitHub - release](https://img.shields.io/github/v/release/raven-actions/bot-details?style=flat-square)](https://github.com/raven-actions/bot-details/releases/latest)
[![GitHub - ci](https://img.shields.io/github/actions/workflow/status/raven-actions/bot-details/ci.yml?logo=github&label=CI&style=flat-square&branch=main&event=push)](https://github.com/raven-actions/bot-details/actions/workflows/ci.yml?query=branch%3Amain+event%3Apush)
[![GitHub - license](https://img.shields.io/github/license/raven-actions/bot-details?style=flat-square)](https://github.com/raven-actions/bot-details/blob/main/LICENSE)

---

This [GitHub Action](https://github.com/features/actions) allows you to quickly and easily get bot (GitHub App) basic details like name, email, id, ... with GitHub format to use in another action for automation like git push, open PR, etc., and set author/committer in the proper form.

- Action is platform-independent and tested on all the latest GitHub-hosted runners (`ubuntu-latest`, `macos-latest`, `windows-latest`).

## 📑 Table of Contents <!-- omit in toc -->

- [🛠️ Usage](#️-usage)
  - [Quick Start](#quick-start)
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
  with:
    bot-slug-name: my-gh-app # (optional) if not specified then default one is 'github-actions'

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

### Example usage scenarios

Below examples based on existing actions.

#### Git commit

```yaml
- name: git-auto-commit Action
  uses: stefanzweifel/git-auto-commit-action@v4
  with:
    commit_user_name: ${{ steps.bot-details.outputs.name }}
    commit_user_email: ${{ steps.bot-details.outputs.email }}
    commit_author: ${{ steps.bot-details.outputs.name-email }}
```

#### Pull Request

```yaml
- name: Create Pull Request Action
  uses: peter-evans/create-pull-request@v5
  with:
    committer: ${{ steps.bot-details.outputs.name-email }}
    author: ${{ steps.bot-details.outputs.name-email }}
```

## 📥 Inputs

|      Name       | Required |   Type   |     Default      | Description                     |
|:---------------:|:--------:|:--------:|:----------------:|:--------------------------------|
| `bot-slug-name` |  false   | `string` | `github-actions` | Bot slug name (GitHub App name) |
| `github-token`  |  false   | `string` |  `github.token`  | GitHub token                    |

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
