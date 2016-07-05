'use strict';

// Require node_modules dependencies
let path = require('path');
let rp = require('request-promise');
let $ = require('cheerio');
let jsdom = require('jsdom');
let fs = require('fs');

// Require other classes, files or configs
const staticDir = path.join(__dirname, '../static/', 'urls.{{cinema}}.json');

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
                scripts: ["http://code.jquery.com/jquery.js"],
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
        let dataStringified = JSON.stringify(data);
        let fileDir = staticDir.replace('{{cinema}}', cinema);

        return new Promise(function(resolve, reject) {
            fs.writeFile(fileDir, dataStringified, function(err) {
                if (err) {
                    return reject(err);
                }

                return resolve(dataStringified)
            });
        });

    }

}
