import mongoose, { Schema, Model } from "mongoose";

// Define the schema for a User
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
    bettedGames: [{
        gameId: {
            type: Schema.Types.ObjectId,
            ref: 'Game',
            required: true
        },
        selectedTeam: {
            type: String,
            required: true,
            enum: ['team1', 'team2', 'draw']
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        }
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
    },
    IsAdmin:{
        type:Boolean,
        default:false,
    }
}, {
    timestamps: true
});

export default UserSchema;
