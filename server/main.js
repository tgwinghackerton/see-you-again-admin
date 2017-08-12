import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const app = express();
const port = 3000;
const devPort = 3001;

import path from 'path';

// Development level
if (process.env.NODE_ENV == 'development') {
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

/* support client-side routing */
app.get('*', (req, res, next) => {
    const regExp = /bundle.js$/;
    if (!regExp.test(req.url)) {
        res.sendFile(path.resolve(__dirname, './../public/index.html'));
    } else {
        next();
    }
});

const server = app.listen(port, () => {
    console.log('listening on port', port);
});