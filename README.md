# Webpack React Starter
An extremely lightweight starter project. The app contains only one page with the "Hello, world" text.

I made my own starter project as I did'nt find any simple ones. Many of the existing projects out there either contains to much or they use Webpack in a too complex manner that makes learning difficult.

**Demo:** http://dervism.github.io/webpack_react_starter/

**How to use:**

- npm start / npm run start: Start the application in development mode.
- npm run build: Create a minified production build.
- npm run deploy: Publish a production copy to your GitHub Pages (if you have a repository)

**What I put together:**

- Webpack
- Babel 5.4
- React
- SASS
- ESLint

**Webpack:**

The configuration is split into three parts:

- common
- start
- build/stat/deploy

_common_ is where you put all config common to both development and producation.
When you run _npm run start_ or _npm run build_, Webpack will merge common configuration
with the specified target config (start or build).

_start_ is the development config. This is where you put the webpack-dev-server, hot reload and
other config necessary for development.

_build_ is where you put production config. Here you will find things like uglify, minification and
other optimizations necessary for production.

To enable browser caching, the build will apply a hash key to the output file. This will save bandwidth for your mobile
users, as the browser only reloads the changed files (those with different hash keys).

**Two online books that inspired this project:** (recommended reading)
- http://survivejs.com/webpack_react/introduction/
- https://christianalfoni.github.io/react-webpack-cookbook/index.html