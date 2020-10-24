module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {
    usingComponents: {
      "f2": "@antv/wx-f2"
    }
  },
  compile: {
    include: ['taro-f2']
  },
  h5: {
    esnextModules: ['taro-ui']
  }
}
