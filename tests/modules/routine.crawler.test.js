'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let RoutineCrawler = require(path.join(__dirname, '../../modules', 'routine.crawler.class'));

describe.skip('RoutineCrawler', () => {
    let Crawler;

    before(function() {
        Crawler = new RoutineCrawler();
    });

    it('start(): Should starts routine of crawling', (done) => {
        Crawler.start()
            .then(function(json) {
                done();
            })
            .catch(done);
    });
});
