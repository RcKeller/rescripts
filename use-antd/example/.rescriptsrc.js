// in <project root>/.rescriptsrc.js

// ANT THEME:
// https://ant.design/docs/react/customize-theme#Ant-Design-Less-variables
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const theme = {
  "@font-family": "'Roboto Mono'"
}

module.exports = [
  // Required for antd"s tree shaking babel-plugin-import
  ["use-babel-config", ".babelrc"],
  // Provide a theme object based on this file
  ["use-antd", { theme }]
]
