var pss = require('../'),
    client = pss.createClient();

client.on('error', function(err){
    console.error('Got error:', err.message);
});

client.on('end', function(){
    console.error('CONNECTION ENDED');
});

