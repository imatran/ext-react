**<h1>ExtJS/ReactJS application</h1>**

This application is to demonstrate how to write an ExtJS application using React/JSX. You will need to have an existing copy of the ExtJS framework for this to work.

**<h2>Requirements</h2>**
- React >= 16.x
- ExtJS >= 6.x

**<h2>Installation</h2>**
- copy ExtJS framework to webapp/extjs/ext
- run `sencha build development`
- cd `webapp/reactjs`
- npm install
- npm run dev
- point your browser to http://localhost:3000

When you run `npm run dev`, the `webpack-dev-server` will monitor for changes on the ReactJS side and build the output file in `extjs/resources/js/bundle.js`.

On the ExtJS side:
- `extjs/resources/js/bundle.js` file is included in `extjs/app.json`
- the main entry for the ReactJS view (DemoView) is rendered in `extjs/app/view/react/React.js`

On the ReactJS side:
- All React fragments are rendered in `reactjs/src/DemoView.js`.
- Each React fragment is defined in `reactjs/src` folder
- All `reactified` ExtJS components are defined in `reactjs/lib/modules.js`. They are all extended from `reactjs/lib/ExtComponent.js`. You can add other ExtJS components to be `reactified` in `reactjs/lib/modules.js`.

**<h2>Usage</h2>**
You can view the demo page that were built with the code in this repository:
https://imatran.github.io/ext-react/demo/index.html

Look at the code in src to learn how to write ExtJS code in React/JSX, starting with `reactjs/src/DemoView.js`.
