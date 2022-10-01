import mongoose from 'mongoose';
import { generalAccents } from '../climbingData.js';
export const taskSchema = new mongoose.Schema({
  ['уровень сложности']: { type: String, required: true },
  акцент: { type: String, required: true },
  // акцент: generalAccents,
  мод: { type: String, required: true },
  тренажер: { type: String, required: true },
  описание: { text: { type: String, required: true }, explain: String || null },
  options: {
    повторения: Number,
    время: Number,
    'тип хвата': String,
    плоскость: String,
    подходы: Number,
    'лимит времени': Number,
    перхваты: Number,
    'ширина полки': Number,
    'постановка рук': String,
    хват: String
  }
});
