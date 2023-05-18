const fs = require('fs/promises');

const getAll = async () => {
  try {
    const talkers = await fs.readFile('src/talker.json');
    return { status: 200, result: JSON.parse(talkers) };
  } catch (error) {
    return { status: 500, result: { message: 'INTERNAL SERVER ERROR, file not found' } };
  }
};

const getById = async (talkerId) => {
  const { status, message, result } = await getAll();
  if (message) return { status, message };
  const talker = result.find(({ id }) => id === Number(talkerId));
  return talker
    ? { status: 200, result: talker }
    : { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
};

const create = async ({ name, age, talk }) => {
  const { result } = await getAll();
  const nextId = result[result.length - 1].id + 1;
  const newTalker = {
    name,
    age,
    id: nextId,
    talk,
  };
  await fs.writeFile('src/talker.json', JSON.stringify([
    ...result,
    newTalker,
  ], null, 2));
  return newTalker;
};

module.exports = { getAll, getById, create };
