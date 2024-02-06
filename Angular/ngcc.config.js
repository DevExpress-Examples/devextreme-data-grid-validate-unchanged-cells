module.exports = {
  devServer: {
    allowedHosts: ".csb.app",
  },
  packages: {
    "devextreme-angular": {
      ignorableDeepImportMatchers: [/devextreme\//, /jszip\//],
    },
    devextreme: {
      ignorableDeepImportMatchers: [/devextreme-quill\//],
    },
  },
};
