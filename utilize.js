import mongoose from 'mongoose';
import { taskSchema } from './models/task.js';

export const getRandomNum = (min, max, maxInclusiveExclusive = 'exlusive') => {
  if (maxInclusiveExclusive === 'exlusive') {
    return Math.floor(Math.random() * (max - min) + min);
  }
  if (maxInclusiveExclusive === 'inclusive') {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};
export const getRandomValueFromArr = (arr, min = 0, max = arr.length) =>
  arr[getRandomNum(min, max)];

export const getRandomModels = (difficulties) => {
  let randomModels = [];
  // if difficulty is random take random db collection
  if (difficulties.length === 0) {
    randomModels.push(
      mongoose.model(
        getRandomValueFromArr(['новичок', 'любитель', 'спортсмен']),
        taskSchema
      )
    );
    return randomModels;
  }

  for (let i = 0; i < difficulties.length; i++) {
    randomModels.push(
      mongoose.model(getRandomValueFromArr(difficulties), taskSchema)
    );
  }

  return randomModels;
};

export const isEmptyArr = (arr) => arr.length === 0;
