import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI!,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        }
            )
    }
    catch (error){
        console.log("Connection Error")
    }

    const connection = mongoose.connection;
    if(connection.readyState>=1) {
        console.log("Connected to Database")
        return;
    }
    connection.on("error", () => console.log("Connection Failed"))
}

export default connectDB;