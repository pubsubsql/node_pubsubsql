var util = require('util'),
    events = require('events');

var default_address = '127.0.0.1',
	default_port = 7777;

function PubSubSqlClient() {
    events.EventEmitter.call(this);

    this.connected = false;
    this.ready = false;
	this.closing = false;

	this.address = default_address + ':' + default_port
}
util.inherits(PubSubSqlClient, events.EventEmitter);


PubSubSqlClient.prototype.on_error = function (err) {
    if (this.closing) {
        return;
    }

    err.message = 'PubSubSql connection to ' + this.address + ' failed - ' + err.message;

    debug(err.message);

    this.connected = false;
    this.ready = false;
    this.emit('error', err);
};

var createClient = function () {
    return new PubSubSqlClient();
}

exports.createClient = createClient;
