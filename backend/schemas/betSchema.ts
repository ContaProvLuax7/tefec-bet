import mongoose, { Schema } from "mongoose";

// Define the schema for a Bet
const BetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    },
    lockedOdds: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Bet', BetSchema);
