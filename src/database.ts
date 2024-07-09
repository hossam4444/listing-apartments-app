
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'nawy'
};

export const createTables = async () => {
    const createApartmentsTableQuery = `
    CREATE TABLE IF NOT EXISTS apartments (
        id VARCHAR(36) PRIMARY KEY,
        longitude DECIMAL(10, 8),
        latitude DECIMAL(11, 8),
        address VARCHAR(255),
        space_sq_meters INT,
        description TEXT,
        offer ENUM('sale', 'rent'),
        price DECIMAL(10, 2),
        currency ENUM('USD', 'EGP'),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `;
    try {
        const connection = await connectDb();
        await connection.execute(createApartmentsTableQuery);
        console.log('DB Tables initiated Sucessfully');
    } catch (error) {
        console.error('Failed to initiate DB tables', error);
    }
};

export const connectDb = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the MySQL database.');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};