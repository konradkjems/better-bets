import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Navn er påkrævet'],
        trim: true,
        minlength: [2, 'Navn skal være mindst 2 tegn'],
        maxlength: [50, 'Navn må højst være 50 tegn']
    },
    email: {
        type: String,
        required: [true, 'Email er påkrævet'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Ugyldig email adresse']
    },
    password: {
        type: String,
        required: [true, 'Password er påkrævet'],
        minlength: [6, 'Password skal være mindst 6 tegn']
    }
}, {
    timestamps: true
});

// Hash password før gemning
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Metode til at sammenligne passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

export const User = mongoose.model<IUser>('User', userSchema); 