'use strict';

// Require node_modules dependencies
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const async = require('async');

// Require crawlers
const MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));
const CinemarkCrawler = require(path.join(__dirname, '/', 'cinemark.crawler.class'));
const CinespacoCrawler = require(path.join(__dirname, '/', 'cinespaco.crawler.class'));
const CinesystemCrawler = require(path.join(__dirname, '/', 'cinesystem.crawler.class'));

module.exports = class RoutineCrawler extends MainCrawler {

    start(cinema) {
        return new Promise((resolve, reject) => {
            let urlsArr;

            if (!cinema) {
                urlsArr = super.getUrlsFromFiles();
            } else {
                urlsArr = super.getUrlsFromFiles(cinema);
            }

            this.createQueue(urlsArr)
                .then(this.doRequests)
                .then((json) => {
                    return resolve(json);
                })
                .catch((err) => {
                    return reject(err);
                });

        });
    }

    createQueue(urlsArr) {
        return new Promise((resolve, reject) => {
            let requestArr = [];

            let Crawlers = {
                CinesystemCrawler: new CinesystemCrawler,
                CinespacoCrawler: new CinespacoCrawler,
                CinemarkCrawler: new CinemarkCrawler
            };

            urlsArr.forEach((urlObj) => {
                switch (urlObj.cinema) {
                    case 'cinesystem':
                        requestArr.push(Crawlers.CinesystemCrawler.getScheduleByUrl(urlObj.url));
                        break;
                    case 'cinespaco':
                        requestArr.push(Crawlers.CinespacoCrawler.getScheduleByUrl(urlObj.url));
                        break;
                    case 'cinemark':
                        requestArr.push(Crawlers.CinemarkCrawler.getScheduleByUrl(urlObj.url));
                        break;
                }
            });

            return resolve(requestArr);
        });
    }

    doRequests(requestArr) {
        return new Promise((resolve, reject) => {
            let resultsArr = [];

            async.each(requestArr, function(item, callback) {
                item.then(function(val) {
                    resultsArr.push(val);
                    setTimeout(callback, 5000);
                });
            }, function(err, results) {
                if (err) {
                    return reject(err);
                }

                return resolve(resultsArr);
            });
        });
    }
}
