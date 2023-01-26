const path = require('path');

const config = {
	entry: './src/index.ts',
	output: {
		filename: 'widget-form-loader.min.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(ts)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};

module.exports = () => {
	if (process.env.NODE_ENV === 'production') {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};
