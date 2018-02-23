'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = [
  merge(baseWebpackConfig, {
    entry: path.resolve(__dirname + '/../src/plugin.js'),
    output: {
      filename: 'vue-cytoscape.js',
      libraryTarget: 'umd',
      library: 'vue-cytoscape',
      umdNamedDefine: true
    }
  })
]

module.exports = webpackConfig
