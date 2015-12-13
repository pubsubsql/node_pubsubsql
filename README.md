# node_pubsubsql
node.js PubSubSql client library

# Connecting

Minimal connection is without any options supplied. In this case, connection is attempted on default path: `localhost:7777`.
``` javascript
var pss = require('pubsubsql'),
    client = pss.createClient();
```

## Connection options
Options are supplied to `createClient` method as an object. Supported options:

- **path** Complete server endpoint in format `host:port`, e.g. `127.0.0.1:7777`
- **host** Server host, e.g. `127.0.0.1`
- **port** Server port, e.g. `7777`
- **family** Connection type, either `IPv6` or `IPv4`. Default is autodetected from `host`.
