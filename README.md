# Zeevo Docs

## Setup

```bash
# installing dependencies
npm install

# running the hugo dev server
npm start

# build the project for deployment
npm run build

# build the project for preview (includes draft and future posts)
npm run build:preview

# generate a new tag
npm version [major,minor,patch]

# to create a new post
npm run hugo:new -- posts/my-awesome-title.md
```

To use the Hugo CLI tool, you can either run it from the `npm run hugo` command,
or directly from the binary at `node_modules\.bin\hugo\hugo.exe` on Windows
or `node_modules/.bin/hugo/hugo` on Linux and macOS.

Please note that in order to pass args to the `npm run` commands,
you must use the double dash syntax, eg. `npm run hugo -- --gc`.

## Deployment on Cloudflare Pages

Remember to set the environment variables on your project build settings
to use specific versions of packages.

```env
HUGO_VERSION=0.100.2
NODE_VERSION=16
```

You must also set the command to build to include the baseUrl argument.
The following provides an environment variable, set automatically by Cloudflare.

```
hugo --baseURL $CF_PAGES_URL
```

## Developer tools

This repository includes a few suggested extensions for Visual Studio Code.
You will be prompted upon opening the project for the first time;
please install them for better auto-formatting and error highlighting.
