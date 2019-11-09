const { getPaths, edit } = require('@rescripts/utilities')

module.exports = (options = {}) => (config) => {
  const { theme } = options
  console.log(`@rescripts/use-antd: adding less-loader, using ${!!theme ? 'custom theme' : 'default styles'}`)
  
  const styleLoaders = getPaths(
    // Styleloaders are in config.module.rules inside an object only containing the "oneOf" prop
    (inQuestion) => inQuestion && !!inQuestion.oneOf,
    config
  )
  edit(
    (section) => {
      const loaders = section.oneOf
      // New style loaders should be added near the end of loaders, but before file-loader
      const fileLoaderIndex = loaders.findIndex(section => section.loader && section.loader.includes('file-loader'))
      const lessLoader = {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              // sourceMap: NODE_ENV === 'production' && GENERATE_SOURCEMAP !== 'false',
              javascriptEnabled: true,
              modifyVars: theme || {}
            }
          }
        ]
      }
      loaders.splice(fileLoaderIndex, 0, lessLoader)
      return section
    },
    styleLoaders,
    config
  )
  
  console.log(`@rescripts/use-antd: successfully configured`)
  return config
}
