const amqp = require("amqplib")
const queueName = process.argv[2] || "jobsQueue";

const message = {
    descripion : "Test 001"
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);
        console.log("Mesaj bekleniyor ...");
        channel.consume(queueName,message =>{
            console.log("Message:",message.content.toString());
            channel.ack(message)
        })
    } catch (error) {
        console.log(error);
    }
   
}