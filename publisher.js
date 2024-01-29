const amqp = require("amqplib")

const message = {
    descripion : "Test 001"
}

const queueName = process.argv[2] || "jobsQueue";

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);
    
        setInterval(() => {
            message.descripion = new Date().getTime();
            console.log("Gönderilen mesaj : ",message)
            channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
        }, 200);


        
    } catch (error) {
        console.log(error);
    }
   
}