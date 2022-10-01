import { taskSchema } from './models/task';
import { beginnerTasks } from './climbingData';

async function main() {
  await mongoose.connect('mongodb://localhost:27017/лазание');
  const BeginnerTask = mongoose.model('новичок', taskSchema);
  for (let task of beginnerTasks) {
    await new BeginnerTask(task)
      .save()
      .then(() =>
        console.log('done with: ', task.описание.text.slice(0, 6) + '...')
      );
  }
}
main().catch((err) => console.log(err));
