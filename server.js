import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {
  getRandomModels,
  getRandomNum,
  getRandomValueFromArr,
  isEmptyArr
} from './utilize.js';

import {
  generalAccents,
  generalMods,
  generalEquipments
} from './climbingData.js';


const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/', async (res, req) => {
  await mongoose
    .connect('mongodb://localhost:27017/лазание')
    .catch((err) => console.log('truble with db connection'));

  let tasks = [];
  const TASKSLIMIT = 6;

  const data = res.body;
  const difficulties = data['уровень сложности'];
  const accents = data['акценты'];
  const equipments = data['тренажеры'];
  const mod = data['мод'];

  const randomModels = getRandomModels(difficulties);

  const accentsFilter = isEmptyArr(accents)
    ? { $in: generalAccents }
    : { $in: accents };
  const equipmentsFilter = isEmptyArr(equipments)
    ? { $in: generalEquipments }
    : { $in: equipments };
  const modFilter = isEmptyArr(mod) ? { $in: generalMods } : { $in: mod };

  if (randomModels.length === 1) {
    tasks = tasks.concat(
      await randomModels[0]
        .aggregate()
        .match({
          акцент: accentsFilter,
          тренажер: equipmentsFilter,
          мод: modFilter
        })
        .sample(TASKSLIMIT)
    );
  } else {
    let reminder = TASKSLIMIT;
    while (reminder !== 0 && tasks.length !== TASKSLIMIT) {
      const model = getRandomValueFromArr(randomModels);
      let tasksAmount = getRandomNum(1, reminder, 'inclusive');
      tasks = tasks.concat(
        await model
          .aggregate()
          .match({
            акцент: accentsFilter,
            тренажер: equipmentsFilter,
            мод: modFilter
          })
          .sample(tasksAmount)
      );
      reminder -= tasksAmount;
    }
  }
  mongoose.connection.close();

  let difficultyLvl;
  for (let i = 0; i < tasks.length; i++) {
    switch (tasks[i]['уровень сложности']) {
      case 'cttl':
        difficultyLvl = 'cttl';
        break;
      case 'спортсмен':
        difficultyLvl = 'спортсмен';
        break;
      case 'любитель':
        difficultyLvl = 'любитель';
        break;
      case 'новичок':
        difficultyLvl = 'новичок';
      default:
        difficultyLvl = 'новичок';
    }
  }

  const dataToRequest = {
    tasks,
    difficultyLvl
  };
  req.send(dataToRequest);
});

app.listen(PORT, () => {
  console.log('started');
});
