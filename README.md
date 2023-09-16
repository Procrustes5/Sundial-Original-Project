## Introduction
Hello, We are Sundial Games.
We start creating 2D Top Down Game with Phaser3 / TypeScript / Vite / Electron.

## Get Started
This is an example template. To try it out do the following:

1. Clone this repo
1. Run `npm install`
1. Run `npm run vite:build`
1. Run `npm run start`
1. You can run this project with Electron

```
{
  "scripts": {
    "start": "npm-run-all makedir:dist filecopy:* background:build --parallel vite:dev --race electron:start", // Start project with Electron
    "vite:build": "vite build", // build for production
  }
}
```


## Why this tech stack

I looked at quite a few web game frameworks. I settled on this setup because:

* Phaser is the most prominent web game framework, with a lot of examples for pretty much every scenario.
* Typescript lets me auto-complete everything and makes sure I avoid silly typo bugs.
* Vite is much faster and simpler than Rollup and Webpack. I practically didn't have to do anything to get Phaser to work here, there's no complicated config file. The development-build-refresh cycle seems instant. It's fast enough that I never felt the need to measure it. Vite was built by evanw@ the person that built Vue.js.
