import path from 'path'
import webpack from 'webpack'

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client', 
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{ test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['react-hot', 'babel'] },
		    { test: /\.css$/, loader: "style-loader!css-loader" },
		    { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' },
		    { test: /\.(otf|eot|ttf)$/, loader: "file-loader?prefix=font/" },
		    { test: /\.svg$/, loader: "svg-react-loader!file-loader" }
		]
	},
	svgLoader: {
		includePaths: [
			'./node_modules'
		]
	},
	resolve: {
		root: __dirname,
		extentions: ['', '.js', '.css']
	}
}