const express = require('express');
const bodyParser = require('body-parser');
import * as path from 'path';
import * as fs from 'fs';
import * as cheerio from 'cheerio';
const request = require('request');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
import { AppModule } from '../src/app/app.module';
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const liveReloadServer = livereload.createServer();
// const user = require('../server/user');
// const hanaClient = require(path.resolve('./config/hanaclient'));
require('dotenv').config();

module.exports = () => {
  const app = express();
  app.use(connectLivereload());
  // Showing stack errors
  app.set('showStackError', true);

  app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
          maxAge: 1000 * 60 * 60 * 24
      }
  }));

  app.use(methodOverride());

  // Add the cookie parser
  app.use(cookieParser());

  // healthcheck
  app.use('/healthcheck', require('express-healthcheck')());

  const APP_SEARCH_DIRS = ['dist', '../dist'].map(dir => path.join(__dirname, dir));
  const appDirectory = APP_SEARCH_DIRS.find(dir => fs.existsSync(dir + '/index.html'));


  // app.use(express.static(path.join(__dirname, '../dist')));

  app.get('/api/user/me', (req, res) => {
    const username = req.headers.auth_user ? req.headers.auth_user : process.env.TEMP_USER;
    res.json({loggedInUser: 'isokhi'});
  });

  /*
  app.all('/api/*', (req, res, next) => {
    const tokenConfig = {
      tokenUrl: process.env.TOKEN_URL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      grantType: process.env.GRANT_TYPE
    };

    const url = tokenConfig.tokenUrl + '?client_id=' + tokenConfig.clientId + '&client_secret=' +
     tokenConfig.clientSecret + '&grant_type=' + tokenConfig.grantType ;

     if (process.env.NODE_ENV !== 'local') {
      request.post(url, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              const info = JSON.parse(body);
              req.token = info.access_token;
              // console.log('Token Found');
              // console.log(req.token);
              return next();
            }
        });
      } else {
        return next();
      }
  });*/
  liveReloadServer.watch(path.join(__dirname, '../dist'));
  app.use(express.static(path.join(__dirname, '../dist')));


  // Send all other requests to the Angular app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  // so we can get the client's IP address
  app.enable('trust proxy');

  app.disable('x-powered-by');

  return app;

};
