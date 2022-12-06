import env from './loader/env';

function startProyect() {
  try {
    console.log('hello');
    console.log(env.key);
  } catch (error) {
    console.error(error);
  }
}

startProyect();
