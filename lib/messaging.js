
exports.send_command = function(command, cb) {

    if (!this.ready || !this.connected) {
        this.on_error(new Error("Cannot send command, not connected/ready!"));
        return;
        // TODO sending a command when not connected should add command to offline queue and send once ready!
    }

    // TODO check if command is really a qualified string command!

    console.log("\n\nSending command ", command);

    // initialize header
    var header = new Buffer(8);
    header.fill(0);

    var msg_id = ++this.lastMessageId;
    header.writeUInt32BE(command.length, 0);
    header.writeUInt32BE(msg_id, 4);

    this.message_buffer[msg_id] = {
        cmd: command,
        callback: cb,
        data: ""
    };

    this.stream.write(header);
    this.stream.write(command);

    console.log("Sent message!");
};

exports.stream_reply_parser = function(bytes) {
    var offset = 0;

    // TODO: handle multipart messages! if it is a continuation of a multipart message, there is no offset (probably :D)

    console.log("[library] BYTES:", bytes);
    var size = bytes.readUInt32BE(0),
        msg_id = bytes.readUInt32BE(4);
    console.log("[library] New message! message size:", size, " message ID:", msg_id);

    totalBytes = size;
    var receivedBytes = 0; // when handling multipart messages this counter should be somewhere outside

    complete_msg = "";
    running = true;

    offset = 8;

    var string = bytes.slice(offset).toString('utf8');

    receivedBytes += string.length;
    this.message_buffer[msg_id].data += string;

    this.message_buffer[msg_id].callback(string);

/*
    if (receivedBytes === totalBytes) {
        console.log("GOT WHOLE MESSAGE", complete_msg);

        try {
            var obj = JSON.parse(complete_msg);

            if (!!obj.data) {
                console.log("got data length:", obj.data.length);
            }  else {
                console.log(obj);
            }
        } catch (e){
            // console.log("error on json parse for string: ", string);
            console.log("error on json");
        }

        running = false;
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        if (command_counter == commands.length) {
            return;
        }

    }
*/


};
