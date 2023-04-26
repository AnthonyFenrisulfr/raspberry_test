const mosca = require('mosca');
const port = { port: 4009 };
const server = new mosca.Server({ port: port });

server.on('ready', () => {
    console.log(`Broker is running on port: ${ port.port }`);
});

server.on('clientConnected', (data) => {
    console.log(`A new client is connected. Client: ${ data.id }`);
});