'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let MainCrawler = require(path.join(__dirname, '../../modules', 'main.crawler.class'));


describe('MainCrawler', () => {
    it('getPage(): Should return an cheerio object', (done) => {
        let url = 'http://www.cinesystem.com.br/florianopolis/programacao';
        let Crawler = new MainCrawler();

        Crawler.getPage(url)
            .then(function($) {
                expect($).to.be.a('function');
                done();
            })
            .catch(done);
    });
});
