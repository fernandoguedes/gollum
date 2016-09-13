const RoutineCrawler = require('../index.js').RoutineCrawler;

RoutineCrawler.start('cinespaco')
    .then(function(schedules) {
        console.log(schedules);
    })
    .catch(function(err) {
        console.log(err);
    });
