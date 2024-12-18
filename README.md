## David Zwirner webapp

This system contains the codebase of our main webapp.

You will find the Sanity studio under the `[/studio](https://cms.zwirner.tech/)`.

## Local development setup

Follow these instructions to set up a local environment of the webpage.

1. Install Git. [Here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) the guide.

2. Clone this repository in your machine using Git and enter the root folder.

3. Create a Github access token:

- Go to https://github.com/settings/tokens
- Click on the _Generate new token_ button
- Choose _Generate new token (classic)_
- Set a meaningful name (like "DZ Package")
- Tick the **_read:packages | Download packages from GitHub Package Registry_** checkbox.
- Click _Generate token_ button and copy the token you just created.

4. Duplicate the `.env.local.example` file and rename it as `.env`. Then:

- Ask engineering for the `SANITY_API_READ_TOKEN` value, and replace it in that file.
- Keep `ISR_TOKEN` commented untill you need it.

5. Use [Yarn v3 (berry)](https://yarnpkg.com/getting-started/install) and Node v18.

```sh
corepack enable
yarn set version berry
```

6. Add `GH_TOKEN` to your terminal config file. For example, if you use zsh, you should:

- Open terminal config file with `open ~/.zshrc` command.
- If file do not exist write `touch ~/.zshrc` and `open ~/.zshrc` again.
- Insert code below at the end of the file and save it. Use the token you created in step 3.

```sh
export GH_TOKEN={your_token}
```

7. Run `yarn` or `yarn install` to install dependencies.

8. Run `yarn dev` to start the development server.

9. Voilà! Open this URL http://localhost:3000/ and you should see the system working.

## Testing

### End to end testing

We use [playwright](https://playwright.dev/) for end to end testing.
In CI these'll run automatically in [Checkly](https://www.checklyhq.com/) which records the test session for viewing later. See [checkly workflow](.github/workflows/checkly.yml) for how that works.

To run tests locally:

- Run the site locally `yarn dev`
- Execute playwright `NODE_ENV=development yarn playwright test`

Other commands to know:

`yarn playwright test`
Runs the end-to-end tests.

`yarn playwright test --ui`
Starts the interactive UI mode.

`yarn playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`yarn playwright test example`
Runs the tests in a specific file.

`yarn playwright test --debug`
Runs the tests in debug mode.

`yarn playwright codegen`
Auto generate tests with Codegen.

More reading:

- https://www.checklyhq.com/docs/
- https://www.checklyhq.com/learn/headless/
- https://playwright.dev/docs/intro
- Templates - https://app.checklyhq.com/checks/browser/create

## Automatic dependency bumps

The Dependabot configuration is located in the `.github/dependabot.yml`. It is
configured to check daily for new versions of dependencies in the `package.json`
and weekly for new versions of actions used in the workflows. If there is a new
version, Dependabot opens a PR.

### Access to private registries

The Dependabot relies on the `GH_TOKEN` secret with a personal access token of
the dzdependabot GitHub account with the `packages:read` permission. This account
was added to the `design-system` repository, so its token allows reading the
repo's packages.

## Features

- Live previews using `next-sanity`.
- Just TypeScript.
- Eslint configuration.
- Environment variables.
- Tailwind.

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmariuslundgard%2Fsanity-template-nextjs&repository-name=sanity-template-nextjs&project-name=sanity-template-nextjs&demo-title=Next.js%20with%20Sanity&demo-description=A%20Sanity-powered%20Next.js%20app%20with%20instant%20previews&demo-url=https%3A%2F%2Fsanity-template-nextjs-delta.vercel.app%2F%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F406933%2F211022598-9b541676-fa68-4618-8a56-92381e075260.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dsanity-template-nextjs
[design-system-repo]: https://github.com/Zwirner/design-system
