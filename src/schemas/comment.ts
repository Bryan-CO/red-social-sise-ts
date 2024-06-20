import { z } from 'zod';

const commentSchema = z.object({
    uuid_usuario: z.string().uuid(),
    contenido: z.string()
});

export function validateComment(object:any){
    return commentSchema.safeParse(object);
}

export function validatePartialComment(object:any){
    return commentSchema.partial().safeParse(object);
}