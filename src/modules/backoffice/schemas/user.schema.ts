import * as mongoose from 'mongoose'; //OBS.: Importado direto da pasta NodeModules

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        default: 'alterar@senha'
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});