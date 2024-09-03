import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
    code: z.optional(z.string()),
    rememberMe: z.optional(z.boolean())
});

export const RegisterSchema = z
    .object({
        email: z.string().email({
            message: 'Email is required'
        }),
        firstName: z.string().min(1, {
            message: 'First name is required'
        }),
        lastName: z.string().min(1, {
            message: 'Last name is required'
        }),
        password: z.string().min(6, {
            message: 'Minimum 6 characters required'
        })
    })
    .superRefine(({ password }, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0,
            countOfSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
            let ch = password.charAt(i);
            if (!isNaN(+ch)) countOfNumbers++;
            else if (containsUppercase(ch)) countOfUpperCase++;
            else if (containsLowercase(ch)) countOfLowerCase++;
            else if (containsSpecialChar(ch)) countOfSpecialChar++;
        }
        if (
            countOfLowerCase < 1 ||
            countOfUpperCase < 1 ||
            countOfSpecialChar < 1 ||
            countOfNumbers < 1
        ) {
            checkPassComplexity.addIssue({
                code: 'custom',
                message: 'password does not meet complexity requirements'
            });
        }
    });

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Minimum of 6 characters required'
    })
});

export const DisplayNameSchema = z.object({
    displayName: z.string().min(1, {
        message: 'Display name is required'
    })
});

export const NameSchema = z.object({
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

export const GenderSchema = z.object({
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'NOTSAY'], {
        message: 'Gender is required'
    })
});

export const LocationSchema = z.object({
    country: z.number({ message: 'Country is required' }),
    state: z.optional(z.number({ message: 'State is required' }))
});

export const DateOfBirthSchema = z.object({
    dateOfBirth: z.date({ message: 'Date of birth is required' })
});

export const ProfilePictureSchema = z.object({
    image: z.string().min(1, {
        message: 'Profile picture is required'
    })
});
