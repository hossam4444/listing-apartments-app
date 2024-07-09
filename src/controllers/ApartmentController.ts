import { Request, Response } from 'express';
import { Apartment, apartmentSchema } from '../models/Apartment';
import { connectDb } from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

export const getAllApartments = async (req: Request, res: Response) => {
    try {
        const connection = await connectDb();
        const [rows] = await connection.query('SELECT * FROM apartments');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching apartments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getApartment = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Missing ID parameter' });
    }

    try {
        const connection = await connectDb();
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM apartments WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Apartment not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching apartment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const postApartment = async (req: Request, res: Response) => {
    const apartment: Apartment = req.body;

    // Validate user input at runtime 
    const { error, value } = apartmentSchema.validate(apartment);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const id = uuidv4();
    const { longitude, latitude, address, space_sq_meters, description, offer, price, currency } = value;

    try {
        const connection = await connectDb();
        const [result] = await connection.execute<ResultSetHeader>(
            `INSERT INTO apartments (id, longitude, latitude, address, space_sq_meters, description, offer, price, currency)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, longitude, latitude, address, space_sq_meters, description, offer, price, currency]
        );
        if (result.affectedRows === 1) {
            res.status(201).json({ message: 'Apartment created successfully', apartment: { ...apartment, id } });
        } else {
            res.status(500).json({ error: 'Failed to create apartment' });
        }
    } catch (error) {
        console.error('Error creating apartment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
