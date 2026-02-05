import mongoose from "mongoose";
import 'dotenv/config';


 const connectDB = async () => {
    try {
 const db = await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion exitosa a la base de datos ✅', db.connection.name)
    } catch (error) {
        console.log('fallo la conexion con la base de datos ❌',error.message);
    }
}

export default connectDB;