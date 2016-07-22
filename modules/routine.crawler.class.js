'use strict';

// Require node_modules dependencies
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const async = require('async');

// Require other classes, files or configs
const MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));
const Crawlers = require(path.join(__dirname, '../', 'index'));
const Mongoose = require(path.join(__dirname, '../db/', 'mongoose.conf'));
const schedulesSchema = require(path.join(__dirname, '../db/schemas/', 'schedule'));

module.exports = class RoutineCrawler extends MainCrawler {

    start() {
        return new Promise((resolve, reject) => {
            let urlsArr = super.getUrlsFromFiles();

            this.createQueue(urlsArr)
                .then(this.doRequests)
                .then(this.saveResults)
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

            urlsArr.forEach((urlObj) => {
                switch (urlObj.cinema) {
                    case 'cinesystem':
                        requestArr.push(Crawlers.CinesystemCrawler.getSchedule(urlObj.url));
                        break;
                    case 'cinespaco':
                        requestArr.push(Crawlers.CinespacoCrawler.getSchedule(urlObj.url));
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
                    callback();
                });
            }, function(err) {
                if (err) {
                    return reject(err);
                }

                return resolve(resultsArr);
            });
        });
    }

    saveResults(arrResults) {
        return new Promise((resolve, reject) => {

            schedulesSchema.insertMany(arrResults, (err, docs) => {
              if (err) {
                  return reject(err);
              }

              return resolve(docs);
            });
        });
    }


}
