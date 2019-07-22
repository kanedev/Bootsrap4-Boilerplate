const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

const glob = require('glob')
const PATHS = {
  src: path.join(__dirname, 'src')
}






const config = {
  mode: env ,
  context: path.resolve(__dirname, 'src'),
  entry:
  {
    appjs: './js/index.js',
  //  main: './js/main.ts',
  //  another: './js/another-module.ts',
   maincss: './assets/scss/main.scss',
   appcss: './assets/scss/app.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env === 'development' ? './js/[name].bundle.js' : './js/[name].bundle.[hash].js',
    chunkFilename: env === 'development' ? './js/[name].bundle.js' : './js/[name].bundle.[hash].js',
     pathinfo: false,
  },



  devServer: {
    watchOptions: {
      poll: true
  },
    contentBase: path.resolve(__dirname, 'src'),
  //  hot: true,
    // inline: true,
    // host: '0.0.0.0',
    port: 1111,
    watchContentBase: true,
    //stats: 'errors-only',
    overlay: true,
    open: true,
    compress: true
  },

  module: {
    // noParse: /jquery|lodash/,
    rules: [
      //babel-loader    
        {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
      exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
      loader: 'babel-loader',
      query: {
          presets: [
            ["@babel/env", {
              "targets": {
                "browsers": "last 2 chrome versions"
              }
            }]
          ]
        }
      },

      //html-loader
      {
        test: /\.html$/,
        use: ['html-loader'],
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      //Css-loader & Sass-loader
      {
        test: /\.(sa|sc|c)ss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
       // exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          //   'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              outputPath: './assets/media/',
              publicPath: '../../',
              // publicPath: '../assets/',
              /// outputPath: './assets/css/',
              // only enable hot in development
             // hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            }
          },
          {
            loader: "css-loader",
            options: {
             // minimize:true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                ctx: {
                  cssnano: {},
                  autoprefixer: {}
                }
              }
            }
          },
          {
            loader: 'resolve-url-loader' // améliore la résolution des chemins relatifs 
            // (utile par exemple quand une librairie tierce fait référence à des images ou des fonts situés dans son propre dossier)
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true // il est indispensable d'activer les sourcemaps pour que postcss fonctionne correctement
            }
          }
        ]
      }
      ,

      // ts-loader
      // {
      //   test: /\.ts$/,
      //   include: [path.resolve(__dirname, 'src', 'js')],
      //   exclude: [path.resolve(__dirname, 'node_modules')],
      //   use: 'awesome-typescript-loader'

      // },

      // file-loader for images
      {
        test: /\.(gif|png|jpe?g)$/i,
        include: [path.resolve(__dirname, 'src', 'assets', 'media')],
        exclude: [path.resolve(__dirname, 'src', 'assets', 'depotMedia')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: env === 'development' ? 'assets/media/[name].[ext]' : 'assets/media/[name].[ext]',
            },
          },
          { loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            // webp: {
            //   quality: 30
            // }
          }
        
        },

        ],
      },
                  // file-loader (for SVGs)
                  {
                    test: /\.(svg)$/i,
            
                    use: [{
                      loader: 'file-loader',
                      options: {
                        name: env === 'development' ? 'assets/media/[name].[ext]' : 'assets/media/[name].[ext]',
                      },
                    }],
                    // exclude: [  path.resolve(__dirname, 'node_modules') ],
                  },

      // file-loader (for fonts)
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,

        use: [{
          loader: 'file-loader',
          options: {
            name: env === 'development' ? '[name].[hash].[ext]' : 'assets/fonts/[name].[hash].[ext]',
          }
        }],
        // exclude: [  path.resolve(__dirname, 'node_modules') ],
      }
    ]
  },



  plugins: [

 
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      // Tether: "tether",
      // "window.Tether": "tether",
      //  Popper: 'popper.js/dist/umd/popper.min.js',
      // Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      // Button: "exports-loader?Button!bootstrap/js/dist/button",
      // Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      // Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      // Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      // Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      // Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      // Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      //  Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      // Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),


 
   new webpack.HashedModuleIdsPlugin(),



   
    new DashboardPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // inject: false,
      //hash: true,
      template: 'index.html',
      filename: 'index.html',
      minify:{
        collapseWhitespace: env === 'development' ? 'false' : 'true', 
        removeComments: env === 'development' ? 'false' : 'true', 
        removeRedundantAttributes:  env === 'development' ? 'false' : 'true',  
        removeScriptTypeAttributes:  env === 'development' ? 'false' : 'true',  
        removeStyleLinkTypeAttributes:  env === 'development' ? 'false' : 'true',  
        useShortDoctype:  env === 'development' ? 'false' : 'true',  

      },
    }),
    new MiniCssExtractPlugin({
      // filename: "assets/css/[name].[hash].css",
      filename: env === 'development' ? '[name].css' : './assets/css/[name].[hash].css',
      chunkFilename: env === 'development' ? '[name].css' : './assets/css/[name].[hash].css',
    }),

    

    // new HtmlCriticalWebpackPlugin({
    //   base: path.resolve(__dirname, 'dist'),
    //   src: 'index.html',
    //   dest: 'index.html',
    //   inline: true,
    //   minify: true,
    //   extract: true,
    //   width: 1300,
    //   height: 900,
    //   penthouse: {
    //     blockJSRequests: false,
    //   }
    // }),
  


 //  new CompressionPlugin(),

//       new PreloadWebpackPlugin({
// // fileWhitelist: [/maincss.css/,/\.\/js\/main.bundle.js/],
//   rel: 'preload',
//  include: 'allChunks',
 
// // include: ['print','maincss']

// } ),


   
    //env === 'development' ? 'new webpack.HotModuleReplacementPlugin(),' : '',
    //new webpack.HotModuleReplacementPlugin(),
 

  ],

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'jquery': 'jquery/dist/jquery.slim.min.js',
      'popper': 'popper.js/dist/umd/popper.min.js',
     
    }
  },
  //  resolve: {
  //      extensions: ['.json','.ts', '.tsx', '.js', '.jsx']
  //   },

};

if (isProduction) {
  config.plugins.push( 
   new PurgecssPlugin({ paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),}),
   new FixStyleOnlyEntriesPlugin(), 
   new CompressionPlugin(),
   new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer : 'false'
}),
 );

 config[optimization]= {
   minimize:true,
   usedExports: true,
 
   runtimeChunk: 'single',
   splitChunks: {
     cacheGroups: {
       styles: {
         name: 'vendors-css',
         test: /\.css$/,
         chunks: 'all',
         enforce: true,
       },
       vendor: {
         maxInitialRequests: Infinity,
         minSize: 0,
         test: /[\\/]node_modules[\\/]/,
         name: 'vendors-js',
         chunks: 'all',

       }
     }
   },

   minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
 };
 


} else { // isDev
  config.devtool = /*'source-map'*/  'inline-source-map';
}





module.exports = config;
