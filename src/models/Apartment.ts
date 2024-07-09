import Joi from 'joi';

export interface Apartment {
    id: string;
    longitude: number;
    latitude: number;
    address: string;
    space_sq_meters: number;
    description: string;
    offer: 'sale' | 'rent';
    price: number;
    currency: 'USD' | 'EGP';
    created_at: Date;
    updated_at: Date;
}

export const apartmentSchema = Joi.object({
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    address: Joi.string().required(),
    space_sq_meters: Joi.number().required(),
    description: Joi.string().optional(),
    offer: Joi.string().valid('sale', 'rent').required(),
    price: Joi.number().required(),
    currency: Joi.string().valid('USD', 'EGP').required()
});