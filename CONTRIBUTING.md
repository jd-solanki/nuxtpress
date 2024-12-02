# Contributing

Thanks for your interest in contributing to this project! We're excited to have you here. We have a few guidelines for contributing, so please take a moment to read through the following sections.

## Setup

As this is project is developed with Nuxt Layer first approach, First you've to clone this repo and use it in another Nuxt project as a layer.

Before proceeding, Think that NuxtPress repo is core and NuxtPress Docs repo is similar to your site which utilizes NuxtPress as a layer. All of core things like components, layouts, styles are in NuxtPress repo.

### Fork Required Repos

First, you need to fork this repo & its docs to your GitHub account. Please fork following two repos:

- [NuxtPress](https://github.com/jd-solanki/nuxtpress)
- [NuxtPress Docs](https://github.com/jd-solanki/nuxtpress-docs)

### Local Setup

Let's clone this repo to your local machine as siblings directories.

Here's how your directory structure should look like:

```plain
- projects
  - nuxtpress
  - nuxtpress-docs
```

Run this two commands in your projects directory to clone these repos:

```shell
# For NuxtPress
git clone https://github.com/<your-username>/nuxtpress.git

# For NuxtPress Docs
git clone https://github.com/<your-username>/nuxtpress-docs.git
```

### Install Dependencies

We'use pnpm to manage dependencies. Please follow their [installation guide](https://pnpm.io/installation) to install pnpm.

Optionally, You can also install [ni](https://github.com/antfu-collective/ni) to auto detect package manager when you work with multiple projects that uses different package managers.

Install dependencies for both projects:

```shell
# Run this in both directory
pnpm i
```

### Start Development

Once you've installed dependencies, You can start development by spinning up server in NuxtPress Docs project:

```shell
cd nuxtpress-docs
pnpm dev
```

This will start a development server at `http://localhost:3000`.

## Contributing

As our setup is complete, You can start contributing to this project.

If you have something that changes the core like adding new feature, fixing a bug, updating layout/component, etc then you should contribute to NuxtPress repo. If you have something that changes the docs like adding new page, updating content, fixing typo, etc then you should contribute to NuxtPress Docs repo.

## Editor

We recommend using VSCode as we have pre-configured settings for it and also recommended extensions. You can find them in `.vscode` directory.
