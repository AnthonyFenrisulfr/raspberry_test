const mqtt = require("mqtt");
const mongoose = require("mongoose");

// Conexión con el servidor MQTT
const host = "localhost";
const port = 4009;
const sub = mqtt.connect(`mqtt://${host}:${port}`);

// Conexión con la base de datos Mongo DB
const DB = 'calidad_del_agua';
const collection = 'datos_de_sensores';
const uri = `mongodb://0.0.0.0/${DB}`;

mongoose.connect(uri)
    .then(() => console.log('Connected to database...'))
    .catch((error) => console.log(`Connection to database failed. Error: ${error}`));

// Definición de la estructura del modelo
const dbSchema = mongoose.Schema({
    date: String,
    time: String,
    sensors: [{
        sensor_name: String,
        values: {
            temperature: Number,
            humidity: Number
        }
    }]
}, { versionKey: false });

const dbModel = mongoose.model(collection, dbSchema);

// Suscripción al tópico
var main_topic = 'sensor_1/temp-hum';

sub.on("connect", () => {
    sub.subscribe(main_topic, (error) => {
        if (!error) {
            console.log(`Subscribed to topic ${main_topic}`);
        } else {
            console.log("Subscription error");
        }
    });
});

sub.on("message", (topic, message) => {
    console.log(`Received data:\n${message.toString()}`);
    create(message);
});

// FUNCIONES ***************************************************************

// Función que crea un nuevo registro en la base de datos
async function create(message) {
    json_msj = JSON.parse(message.toString());
    data = new dbModel();

    for (const i in json_msj) {
        data[i] = json_msj[i];
    }
    await data.save();
}