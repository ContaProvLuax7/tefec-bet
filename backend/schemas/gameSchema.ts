import mongoose, { Schema } from "mongoose";

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
    odds: {
        team1: {
            type: Number,
            required: true,
            min: 1.05, // Ensuring odds are between 105% and 130%
            max: 1.30
        },
        team2: {
            type: Number,
            required: true,
            min: 1.05,
            max: 1.30
        },
        draw: {
            type: Number,
            required: true,
            min: 1.05,
            max: 1.30
        }
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
        type: Schema.Types.ObjectId,
        ref: 'Bet'
    }]
}, {
    timestamps: true
});

export default mongoose.model('Game', GameSchema);
