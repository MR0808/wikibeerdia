'use server';

import {
    uniqueUsernameGenerator,
    Config,
    adjectives,
    nouns
} from 'unique-username-generator';

const config: Config = {
    dictionaries: [adjectives, nouns],
    separator: '',
    style: 'capital'
};

import db from '@/lib/db';

export const getUserByEmail = async (email: string) => {
    email = email.toLowerCase();
    try {
        let user = await db.user.findFirst({ where: { email } });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
};

export const generateDisplayName = async () => {
    let uniqueDisplayName = false;
    let displayName: string = '';
    let user;

    try {
        while (!uniqueDisplayName) {
            displayName = uniqueUsernameGenerator(config);
            user = await db.user.findUnique({ where: { displayName } });
            user ? (uniqueDisplayName = false) : (uniqueDisplayName = true);
        }
        return displayName;
    } catch {
        return null;
    }
};

export const checkDisplayName = async (displayName: string) => {
    try {
        const user = await db.user.findFirst({
            where: { displayName: { equals: displayName, mode: 'insensitive' } }
        });
        return user ? false : true;
    } catch {
        return null;
    }
};
