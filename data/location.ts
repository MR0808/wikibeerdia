'use server';

import db from '@/lib/db';

export const getAllCountries = async () => {
    try {
        const countries = await db.country.findMany({
            orderBy: { name: 'asc' }
        });

        return countries;
    } catch {
        return null;
    }
};

export const getCountryByName = async (name: string) => {
    try {
        const country = await db.country.findFirst({
            where: { name }
        });

        return country;
    } catch {
        return null;
    }
};

export const getCountryById = async (id: number) => {
    try {
        const country = await db.country.findFirst({
            where: { id }
        });

        return country;
    } catch {
        return null;
    }
};

export const getStatesByCountry = async (id: number) => {
    try {
        const states = await db.state.findMany({
            where: { countryId: id },
            orderBy: { name: 'asc' }
        });

        return states;
    } catch (error) {
        return null;
    }
};

export const getStateById = async (id: number) => {
    try {
        const state = await db.state.findFirst({
            where: { id }
        });

        return state;
    } catch {
        return null;
    }
};