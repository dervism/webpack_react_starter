# Webpack React Starter
An extremely lightweight starter project. The app contains only one page with the "Hello, world" text.

I made my own starter project as I did'nt find any simple ones. Many of the existing projects out there either contains
to much or they use Webpack in a too complex manner that makes learning difficult. Another issue I often encounter is the
use of deprecated libraries - such as the many flavours of [*-react-transform](https://github.com/gaearon/babel-plugin-react-transform)
packages.

**Demo:** http://dervism.github.io/webpack_react_starter/

**How to use:**

- npm start / npm run dev: Start the application in development mode.
- npm run build: Create a minified production build.
- npm run deploy: Publish a production copy to your GitHub Pages (if you have a repository)

**What is inside:**

- Webpack
- Babel 6.x
- React 15.x
- SASS
- ESLint
- React Hot Loader 3

Also included in this starter:

- App-configuration
- Styling with CSS-modules

**Webpack setup:**

The configuration is split into three parts:

- common
- dev
- build

_common_ is where you put all config common to both development and producation.
When you run _npm run start_ or _npm run build_, Webpack will merge common configuration
with the specified target config (start or build).

_dev_ is the development config. This is where you put the webpack-dev-server, hot reload and
other config necessary for development.

_build_ is where you put production config. Here you will find things like uglify, minification and
other optimizations necessary for production.

To enable browser caching, the build will apply a hash key to the output file. This will save bandwidth for your mobile
users, as the browser only reloads the changed files (those with different hash keys).

**App configuration**

Webpack is setup to automatically look for the `CONFIG` environment variable. You can use it to point it to any of the available
folder names in the `configuration` folder. To run the application with different configs, simply set the environment value together with
npm run command:

`CONFIG=devlocal npm start`

This will configure your application to use the *devlocal* config. If you dont specify CONFIG, Webpack will just use the *default*
configuration:

`default`: Put default values in this file.

`devlocal`: Example of how to extend the default config.

You can now use this configuration in any module, just by importing the alias set by Webpack:

`const config = require('appconfig');`

**Styling with CSS-modules**

You can use both global styling and component local styling. All global CSS/SASS styling should be added to the Main-component with a simple `require`:

`require('./style.css');`

The same thing would apply to, say Bootstrap:

`require('bootstrap/dist/css/bootstrap.css');` (given that Bootstrap with is added)

The setup has *CSS-modules* mode enabled for SASS files. You can style a component with local class names that get encoded, so they
don't interfere with other components. You import the style and use it directly:

`import styles from './greeting.scss'`

Then in your code:

`<div className={styles.greeting}>`

This enables the class names to be encoded from `.greeting h1` to `._1KouF5dv9niOE7VPtfEJrS h1` when you build the project.
See the Greeting-component demonstrating CSS-modules.

**React Hot Loader 3**

See the Webpack 2.1 documentation for more info:
https://webpack.js.org/guides/hmr-react/

**Two online books that inspired this project:** (recommended reading, however be aware of deprecated libraries such as HMR)
- http://survivejs.com/webpack_react/introduction/
- https://christianalfoni.github.io/react-webpack-cookbook/index.html
