const mosca = require('mosca');
const port = { port: 3000 };
const server = new mosca.Server(port);

server.on('ready', () => {
    console.log(`Server is running on port: ${port.port}`);
});

server.on('clientConnected', (data) => {
    console.log(`A new client is connected. Client: ${data.id}`);
});

/* server.on('published', (packet) => {
    console.log(packet.payload.toString());
}); */