'use strict';

// Require node_modules dependencies
let path = require('path');
let cheerio = require('cheerio');

// Require other classes, files or configs
let MainCrawler = require(path.join(__dirname, '../modules', 'main.crawler.class'));

module.exports = class CinesystemCrawler extends MainCrawler {

    getSchedule(url) {
        return new Promise((resolve, reject) => {
            this._mineSite(url)
                .then(function(schedule) {
                    return resolve(schedule);
                });

        });
    }

    _mineSite(url) {
        let _this = this;
        return new Promise((resolve, reject) => {
            super.getStaticPage(url)
                .then(function($) {
                    let movies = [];
                    let dom = '.repeat-filmes li';
                    let cinema = {
                        name: 'cinesystem',
                        city: String,
                        place: String,
                        sessions: []
                    };

                    let city = $('.title-city').text();
                    let place = city.match(/\(([^)]+)\)/)[1];

                    city = city.replace(/ *\([^)]*\) */g, "");

                    cinema.city = city;
                    cinema.place = place;

                    $(dom).each(function() {
                        let title = $(this).find('div table tbody td h2').text();
                        let normalized = _this.stringNormalize(title); // super
                        let type = $(this).find('.sessoes table tbody tr td').eq(0).text().trim();
                        $(this).find('.sessoes table tbody tr td strong').remove()
                        let hours = $(this).find('.sessoes table tbody tr td').eq(1).html().trim();
                        let special = $(this).find('.categoria img').attr('src') ? true : false;
                        hours = hours.replace(/ /g,'').replace(/,/g, '');
                        hours = hours.match(/.{1,5}/g);
                        let movie = {
                            title: title,
                            normalized: normalized,
                            type: type,
                            censorship: null,
                            special: special,
                            hours: hours
                        };

                        movies.push(movie);
                    });

                    cinema.sessions = movies;
                    return resolve(cinema);

                });
        });
    }

    replaceHtmlChars(str) {
        let strReplaced = str
            .replace('&#xF3;', 'ó')
            .replace('&#xE2;', 'â')
            .replace('&#xE1;', 'á')
            .replace('&#xE3;', 'ã')
            .replace('&#xED;', 'í')
            .replace('&#xF3;', 'ó')
            .replace('&#xE9;', 'é');

        return strReplaced;
    }

    getCinemasURLs() {
        let _this = this;
        return new Promise((resolve, reject) => {
            const url = 'http://www.cinesystem.com.br';
            super.getStaticPage(url)
                .then(($) => {
                    let placesArr = [];
                    let cinemaObj = {
                        place: String,
                        place_label: String,
                        city: String,
                        city_label: String,
                        url: String
                    };

                    let ulElem = $('.menu li:nth-child(6) div:nth-child(2) ul:nth-child(1)').html();
                    ulElem = ulElem
                        .replace('/<li>/g', '')
                        .replace('/</li>/g', '')
                        .replace('<li class="arrow">', '');
                    let urls = ulElem.match(/<a(.*?)<\/a>/g);
                    urls.forEach(function(v, k) {
                        let temp = v.split(/"(.*?)"/)[2].replace('>', '').replace('</a>', '')

                        let urlCinema = url + v.match(/"(.*?)"/)[1];
                        let place_label = _this.replaceHtmlChars(temp.match(/\((.*?)\)/)[1].trim()).toLowerCase();
                        let place = _this.stringNormalize(place_label);
                        let city_label = _this.replaceHtmlChars(temp.match(/[^()]+/)[0].trim()).toLowerCase();
                        let city = _this.stringNormalize(city_label);

                        cinemaObj.place = place;
                        cinemaObj.place = place;
                        cinemaObj.place_label = place_label;
                        cinemaObj.city = city;
                        cinemaObj.city_label = city_label;
                        cinemaObj.url = urlCinema;

                        placesArr.push(cinemaObj);
                    });

                    _this.writeUrlsFile('cinesystem', placesArr)
                        .then(function(val) {
                            return resolve(val);
                        })
                        .catch(function(err) {
                            return reject(err);
                        });

                })
                .catch(function(err) {
                    return reject(err);
                });
        });
    }

}
