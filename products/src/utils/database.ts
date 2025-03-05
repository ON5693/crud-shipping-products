import config from "./config";
import mongoose from 'mongoose';


export const getDb = async () => {
    try{ 
        mongoose
		.connect(config.DB_URI, { authSource: 'admin', directConnection: true })
		.then(() => console.log('Connected to the database'))
		.catch(err => console.log(err));
        const dbClient = mongoose.connection;
        return { dbClient };
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};