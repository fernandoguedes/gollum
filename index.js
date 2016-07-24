'use strict';

// Require node_modules dependencies
let path = require('path');

// Require other classes, files or configs
let CinemarkCrawler = require(path.join(__dirname, 'modules', 'cinemark.crawler.class'));
let CinespacoCrawler = require(path.join(__dirname, 'modules', 'cinespaco.crawler.class'));
let CinesystemCrawler = require(path.join(__dirname, 'modules', 'cinesystem.crawler.class'));
let RoutineCrawler = require(path.join(__dirname, 'modules', 'routine.crawler.class'));

module.exports = {
    RoutineCrawler: new RoutineCrawler(),
    CinemarkCrawler: new CinemarkCrawler(),
    CinespacoCrawler: new CinespacoCrawler(),
    CinesystemCrawler: new CinesystemCrawler()
}
