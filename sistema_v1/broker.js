const mosca = require('mosca');
const port = { port: 4009 };
const broker = new mosca.Server(port);

broker.on('ready', () => {
    console.log(`Broker is running on port: ${ port.port }`);
});

broker.on('clientConnected', (data) => {
    console.log(`A new client is connected. Client: ${ data.id }`);
});