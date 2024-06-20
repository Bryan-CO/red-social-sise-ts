import z from 'zod';

const reactionSchema = z.object({
    user_uuid: z.string().uuid(),
    reaction_id: z.number().positive().max(5)
});

export function validateReaction(object:any){
    return reactionSchema.safeParse(object);
}

export function validatePartialReaction(object:any){
    return reactionSchema.partial().safeParse(object);
}