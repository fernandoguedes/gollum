'use strict'
let expect = require('chai').expect;
let path   = require('path');

let PlayarteCrawler = require(path.join(__dirname, '../../modules/', 'playarte.crawler.class'));


describe('PlayarteCrawler', () => {
    let Crawler;

    beforeEach(function(){
        Crawler = new PlayarteCrawler();
    })

    it('getPage(): Should return a page with title containing \'Playarte\'', (done) => {
        let url = 'http://www.playartecinemas.com.br/';
        Crawler.getPage(url)
            .then(function($){
                expect($("title").html().toLowerCase())
                    .to.have.string('playarte cinemas');
                done();
            })
            .catch(done);
    })
})
