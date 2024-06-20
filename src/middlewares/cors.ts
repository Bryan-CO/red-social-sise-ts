import cors, { CorsOptions } from 'cors';


const ACCEPTED_ORIGINS: string[] = [
    'http://localhost:5500',
    'http://localhost:3000',
    'http://redsocial.com.pe'
];

export function corsMiddleware() {
    const options: CorsOptions = {
        origin: (origin, callback) => {
            if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Dominio no permitido :('));
            }
        }
    };

    return cors(options);
}