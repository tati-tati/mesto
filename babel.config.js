module.exports = {
  presets: [
      [
          '@babel/preset-env', {
              targets: {
                  ie: '11',
                  chrome: '64',
              },
              useBuiltIns: "entry",
              corejs: "3.29"
          }
      ]
  ]
}