const mqtt = require("mqtt");
const mongoose = require("mongoose");

// Conexión con el servidor MQTT
const host = "localhost";
const port = 3000;

const sub = mqtt.connect(`mqtt://${host}:${port}`);

// Conexión con la base de datos Mongo DB
const DB = 'prueba';
const collection = 'datos_sensores';
const uri = `mongodb://0.0.0.0/${DB}`;

mongoose.connect(uri)
    .then(() => console.log('Connected to database...'))
    .catch((error) => console.log(`Connection to database failed. Error: ${error}`));

// Definición de la estructura del modelo
const dbSchema = mongoose.Schema({
    id_sensor: Number,
    values: {
        temperature: Number,
        humidity: Number
    },
    time: String,
    date: String
}, { versionKey: false });

const dbModel = mongoose.model(collection, dbSchema);

// Suscripción al tópico
var topic = "sensor_1/#";
sub.on("connect", () => {
    sub.subscribe(topic, (error) => {
        if (!error) {
            console.log(`Subscribed to topic ${topic}`);
        } else {
            console.log("Subscription error");
        }
    });
});

sub.on("message", (topic, message) => {
    console.log(`\nData:\n${message.toString()}\n`);
    create(message);

});

// FUNCIONES ***************************************************************

// Función que devuelve todos los documentos de la base de datos
async function read() {
    let data = await dbModel.find();
    console.log(data);
}

// Función que crea un nuevo registro en la base de datos
async function create(message) {
    json_msj = JSON.parse(message.toString());
    data = new dbModel();

    for (const i in json_msj) {
        data[i] = json_msj[i];
    }
    
    await data.save();
}