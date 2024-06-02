import mongoose, { Schema } from "mongoose";

// Define the schema for a User
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    balanceHistory: [{
        source: {
            type: String,
            required: true,
            enum: ['deposit', 'withdrawal', 'giveaway_win', 'game_win', 'cashback']
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }],
    bets: [{
        type: Schema.Types.ObjectId,
        ref: 'Bet'
    }],
    options: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        darkMode: {
            type: Boolean,
            default: false
        },
        privacy: {
            showBetsPublicly: {
                type: Boolean,
                default: false
            }
        },
        notificationSettings: {
            betPlaced: {
                type: Boolean,
                default: true
            },
            gameStart: {
                type: Boolean,
                default: true
            },
            gameEnd: {
                type: Boolean,
                default: true
            }
        }
    }
}, {
    timestamps: true
});

export default mongoose.model('user',UserSchema);
