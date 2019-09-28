module.exports = {
  title: 'vue-cytoscape',
  description: 'a vue wrapper of cytoscape.js',
  base: '/vue-cytoscape/',
  themeConfig: {
    repo: 'rcarcasses/vue-cytoscape',
    editLinks: true,
    docsDir: 'docs',
    search: false,
    sidebar: ['/', '/installation', '/api', '/examples', '/CHANGELOG']
  },
  plugins: ['@vuepress/last-updated']
}