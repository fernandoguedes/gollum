'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let CinesystemCrawler = require(path.join(__dirname, '../../modules', 'cinesystem.crawler.class'));


describe('CinesystemCrawler', () => {
    it('getSchedule(): Should return schedule JSON', (done) => {
        let url = 'http://www.cinesystem.com.br/florianopolis/programacao';
        let Crawler = new CinesystemCrawler();

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
});
