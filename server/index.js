/* NPM Libraries*/
import express from 'express';
import bodyParser from 'body-parser';

/* Webpack Libraries*/
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import connectdb from './connectdb';

/* Mongoose Models */
import users from './model/users';

/* Routes */
import index from './routes/index';
import login from './routes/login';
import signUp from './routes/signUp';
import otp from './routes/otp';
import disease from './routes/disease';

const app = express();

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
	hot:true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true 
}));
app.use(webpackHotMiddleware(compiler));

const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/login', login);
app.use('/signUp', signUp);
app.use('/otp', otp);
app.use('/disease', disease);
app.use('/*', index);

app.listen(3000, () => {
	console.log('running on localhost:3000')
});