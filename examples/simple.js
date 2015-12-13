var pss = require('../'),
    client = pss.createClient(),
    async = require('async');

client.on('error', function(err){
    console.error('Got error:', err.message);
});

client.on('end', function(){
    console.log('CONNECTION ENDED');
});

client.on('ready', function() {
    console.log('CONNECTION READY');

    async.waterfall([
        function(cb) {
            client.query('key Stocks Ticker', function(response, err) {
                console.log("GOT RESPONSE ON COMMAND:", response, err);
                cb();
            });
        }, function(cb) {
            client.query('tag Stocks MarketCap', function(response, err) {
                console.log("GOT RESPONSE ON COMMAND:", response, err);
                cb();
            });
        }, function(cb) {
            client.query("subscribe * from Stocks where MarketCap = 'MEGA CAP'", function(response, err) {
                console.log("GOT RESPONSE ON COMMAND:", response, err);
                cb();
            });
        }
    ]);
})

