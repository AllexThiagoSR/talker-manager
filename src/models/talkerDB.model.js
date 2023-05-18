const connection = require('../db/connection');

const getAll = async () => {
  const talkers = await connection.execute('SELECT * FROM talkers');
  console.log(talkers[0]);
  const formatedTalkers = talkers[0]
    .map(({ id, name, age, talk_watched_at: watchedAt, talk_rate: rate }) => ({
      name,
      id,
      age,
      talk: {
        watchedAt,
        rate,
      },
    }));
  console.log(formatedTalkers);
  return formatedTalkers;
};

module.exports = { getAll };
