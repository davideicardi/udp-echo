#!/usr/bin/env node

/*
Usage:
DESTINATION=server:port PORT=listeningPort node index.js
*/

const dgram = require("dgram");
const readline = require('readline');



const socket = dgram.createSocket("udp4");

socket.on("error", (err) => {
    console.log(`server error:\n${err.stack}`);
});

socket.on("message", (data, rinfo) => {
    const destination = `${rinfo.address}:${rinfo.port}`;
    const msg = data.toString();
    console.log(`${destination} => ${msg}`);

    if (!msg.startsWith("echo[")) {
        send(`echo[${msg}]`, destination);
    }
});

socket.on("listening", () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);

    readAndSend();
});

function send(data, destination) {
    const destinationPort = destination.split(":")[1] || 41234;
    const destinationIp = destination.split(":")[0];
    socket.send(Buffer.from(data), destinationPort, destinationIp, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log(`${data} => ${destination}`);
    });
}

console.log("node-udp-echo");
console.log("usage:");
console.log("\tDESTINATION=host:port PORT=listeningPort udp-echo");
console.log("If a destination is specified you can also send text using the console.")
console.log("Default port is 41234");

run();

async function run() {
    const port = process.env.PORT || 41234;
    socket.bind(port);
}

async function readAndSend() {
    if (!process.env.DESTINATION) {
        return;
    }
    const msg = await consoleRead();
    send(msg, process.env.DESTINATION);
    
    await readAndSend();
}

function consoleRead() {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('>', (answer) => {
            resolve(answer);

            rl.close();
        });
    });
}

