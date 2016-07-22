'use strict';

// Require node_modules dependencies
const path = require('path');
const rp = require('request-promise');
const $ = require('cheerio');
const jsdom = require('jsdom');
const fs = require('fs');
const _ = require('lodash');

module.exports = class MainCrawler {

    getStaticPage(url, headers) {
        let options = {
            uri: url,
            headers: {},
            transform: function (body) {
                return $.load(body);
            }
        };

        if (headers) {
            options.headers = headers;
        }

        return new Promise(function (resolve, reject) {
            rp(options)
                .then(function($) {
                    return resolve($);
                })
                .catch(function(error) {
                    return reject(error);
                });
        });
    }

    getDynamicPage(url) {
        return new Promise(function(resolve, reject) {
            jsdom.env({
                url: url,
                scripts: ['http://code.jquery.com/jquery.min.js'],
                done: function (err, window) {
                    if (err) {
                        return reject(err);
                    }

                    let $ = window.$;

                    return resolve($);
                }
            });
        });
    }

    stringNormalize(str) {
        let translate = { "à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a", "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e",
            "ê":"e", "ë":"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n", "ò" :"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o",
            "ø":"o", "ù":"u", "ú":"u", "û":"u", "ü":"u", "ý":"y", "þ":"b", "ß" :"s", "à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a",
            "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e", "ê":"e", "ë" :"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n",
            "ò":"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o", "ø" :"o", "ù":"u", "ú":"u", "û":"u", "ý":"y", "ý":"y", "þ":"b", "ÿ":"y",
            "ŕ":"r", "ŕ":"r"
        },
        translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕ]/gim;
        return (str.replace(translate_re, function(match) {
            return translate[match];
        }).toLowerCase());
    }

    writeUrlsFile(cinema, data) {
        let STATIC_DIR = this.staticDir() + 'urls.{{cinema}}.json';
        let FILE_DIR = STATIC_DIR.replace('{{cinema}}', cinema);
        let dataStringified = JSON.stringify(data);

        return new Promise(function(resolve, reject) {
            fs.writeFile(FILE_DIR, dataStringified, function(err) {
                if (err) {
                    return reject(err);
                }

                return resolve(dataStringified)
            });
        });
    }

    getUrlsFromFiles(grouped) {
        const STATIC_DIR = this.staticDir();
        const FILES = fs.readdirSync(STATIC_DIR);
        let cinemas = [];

        FILES.forEach((file) => {
            const FILE_DIR = STATIC_DIR + file;
            let obj = JSON.parse(fs.readFileSync(FILE_DIR, 'utf-8'));
            cinemas.push(obj);
        });

        cinemas = _.flattenDeep(cinemas);

        if (grouped) {
            let urlsCitiesGrouped = _.chain(cinemas)
                .orderBy('city')
                .groupBy('city')
                .value();

            return urlsCitiesGrouped;
        }

        return cinemas;
    }

    staticDir() {
        let dir = path.join(__dirname, '../static/');
        return dir;
    }


}
