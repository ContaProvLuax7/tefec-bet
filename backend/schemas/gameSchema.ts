import { Schema, Model } from "mongoose";

// Define the schema for a Game
const GameSchema = new Schema({
    info: {
        date: {
            type: Date,
            required: true
        },
        league: {
            type: String,
            required: true,
            trim: true
        },
        teams: [{   
            type: String,
            required: true,
            trim: true
        }]
    },
    pools: {
        team1: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        team2: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        draw: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    bets: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
    }]
}, {
    timestamps: true
});


export default GameSchema;
