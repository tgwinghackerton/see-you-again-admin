import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const app = express();
const port = 3000;
const devPort = 3001;

// Development level
if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

// static files
app.use('/', express.static(__dirname + '/../public'));

// route
import posts from './routes/posts';
app.use('/posts', posts);

const server = app.listen(port, () => {
    console.log('listening on port', port);
});