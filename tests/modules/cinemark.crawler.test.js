'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinemarkCrawler = require(path.join(__dirname, '../../modules/', 'cinemark.crawler.class'));

describe('CinemarkCrawler', () => {
    it('getSchedule(): Should return a valid schedule JSON', (done) => {
        let url = 'http://cinemark.com.br/programacao/florianopolis/floripa-shopping/24/703';
        CinemarkCrawler = new CinemarkCrawler();

        CinemarkCrawler.getSchedule(url)
            .then(function(json) {
                expect(json.city)
                    .to.be.equal('Florianópolis');

                expect(json.place)
                    .to.be.equal('Floripa Shopping');

                expect(json.sessions)
                    .to.not.be.null;

                done();
            })
            .catch(done);
    });
});
