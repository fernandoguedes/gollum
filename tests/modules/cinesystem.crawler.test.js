'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinesystemCrawler = require(path.join(__dirname, '../../modules', 'cinesystem.crawler.class'));

describe('CinesystemCrawler', () => {
    const url = 'http://www.cinesystem.com.br/florianopolis/programacao';;
    let Crawler;

    before(function() {
        Crawler = new CinesystemCrawler();
    });

    it('getSchedule(): Should return schedule JSON', (done) => {
        Crawler.getSchedule(url)
            .then(function(json) {
                expect(json.city)
                    .to.be.equal('Florianópolis');

                expect(json.place)
                    .to.be.equal('Shopping Center Iguatemi');

                expect(json.sessions)
                    .to.not.be.null;

                done();
            })
            .catch(done);
    });

    it('getCinemasURLs(): Should return a valid URLs cinemas JSON', (done) => {
        Crawler.getCinemasURLs()
            .then(function(json) {
                expect(json).to.not.be.null;
                done();
            })
            .catch(done);
    });
});
