import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const uri = process.env.DB_URI;
    
    if (!uri) {
      throw new Error("DB_URI is not defined in the environment variables.");
    }

  
    const options = {
      serverSelectionTimeoutMS: 5000,  
      socketTimeoutMS: 45000,         
      maxPoolSize: 10,                
      retryWrites: true,
      w: "majority"
    };

    const connection = await mongoose.connect(uri, options);

    
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${connection.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });

  
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed due to application termination');
      process.exit(0);
    });

    console.log(`Database connected successfully to ${connection.connection.name}`);
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.error("Network error occurred. Please check:");
      console.error("- Is MongoDB running?");
      console.error("- Is the connection string correct?");
    }

    process.exit(1);
  }
};