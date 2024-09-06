import * as OTPAuth from 'otpauth';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

import { generateRandomString } from '@/lib/tokens';

export async function POST(req: NextRequest): Promise<Response> {
    try {
        const data = await req.json();
        const { name, secret, token, setup } = data;
        // console.log(data);

        let totp = new OTPAuth.TOTP({
            issuer: 'Wikibeerdia',
            label: name,
            algorithm: 'SHA1',
            digits: 6,
            secret
        });

        let delta = totp.validate({ token, window: 2 });

        let returnData;

        if (delta === null) {
            returnData = { result: false };
            return Response.json({ data: returnData });
        }

        if (setup) {
            const recoveryCodes = [];
            const recoveryCodesHashed = [];
            for (let i = 0; i < 6; i++) {
                const recoveryCode = generateRandomString(6);
                let chars = [...recoveryCode];
                chars.splice(3, 0, '-');
                const hashedCode = await bcrypt.hash(recoveryCode, 12);
                recoveryCodes.push(chars.join(''));
                recoveryCodesHashed.push(hashedCode);
            }

            returnData = {
                result: true,
                recoveryCodes,
                recoveryCodesHashed,
                otpAuthUrl: totp.toString()
            };
        } else {
            returnData = { result: true };
        }

        return Response.json({ data: returnData });
    } catch (error) {
        console.log('error inside get route', error);
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response('Internal Server Errors', { status: 500 });
    }
}
