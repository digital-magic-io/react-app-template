const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false
    },
    'icons'
  ],
  [
    'babel-plugin-styled-components',
    {
      displayName: true,
      namespace: 'react-app-dm-template',
      meaninglessFileNames: ['index', 'styles']
    }
  ]
]

module.exports = { plugins }
