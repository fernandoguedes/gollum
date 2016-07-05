'use strict';

let expect = require('chai').expect;
let path = require('path');
let fs = require('fs');

// Import classes for testing
let MainCrawler = require(path.join(__dirname, '../../modules', 'main.crawler.class'));


describe('MainCrawler', () => {

    const url = 'http://www.cinesystem.com.br/florianopolis/programacao';
    let Crawler;

    before(function() {
        Crawler = new MainCrawler();
    });

    it('getStaticPage(): Should return an cheerio (jquery) object', (done) => {
        Crawler.getStaticPage(url)
            .then(function($) {
                expect($).to.be.a('function');
                done();
            })
            .catch(done);
    });

    it('getDynamicPage(): Should return an jsdom (jquery) object', (done) => {
        Crawler.getDynamicPage(url)
            .then(function($) {
                expect($).to.be.a('function');
                done();
            })
            .catch(done);
    });

    it('writeUrlsFile(): Should write stringified data into a file', (done) => {
        const fileDir = path.join(__dirname, '../../static/', 'urls.default.json');
        const data = {
            place: 'place',
            place_label: 'place_label',
            city: 'city',
            city_label: 'city_label',
            url: 'url'
        };

        Crawler.writeUrlsFile('default', data)
            .then(function(data) {
                let fileExists = fs.statSync(fileDir).isFile();
                expect(data).to.not.be.null;
                expect(fileExists).to.be.true;
                done();
            })
            .catch(done);
    });
});
