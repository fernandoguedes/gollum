'use strict';

let expect = require('chai').expect;
let path = require('path');

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
});
