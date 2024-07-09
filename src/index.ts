
import express, { Request, Response, NextFunction } from 'express';
import { connectDb, createTables } from './database';
import routs from './routs/index';

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await createTables();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

// Mount routes
app.use('/', routs);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong in the server!' });
});

startServer();
