const fs = require('fs/promises');
const writeInfile = require('../utils/writeInFile');

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

const search = async ({ rate, q, date }) => {
  const { status, result } = await getAll();
  try {
    const filteredByQuery = result.filter(({ name: talkerName, talk }) => {
      const fitInSearchTerms = talkerName.includes(q) && talk.watchedAt.includes(date);
      const rateFitSearchTerm = (!rate ? true : talk.rate === Number(rate));
      return fitInSearchTerms && rateFitSearchTerm;
    });
    return { status, result: filteredByQuery };
  } catch (error) {
    return { status, result };
  }
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
  await writeInfile([...result, newTalker]);
  return newTalker;
};

const uptade = async (id, payload) => {
  const { result } = await getAll();
  const talkerToUpdate = result.find((talker) => talker.id === Number(id));
  if (!talkerToUpdate) {
    return { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
  }
  const updatedTalker = { ...talkerToUpdate, ...payload };
  const newTalkers = result.map((talker) => (talker.id === Number(id) ? updatedTalker : talker));
  await writeInfile(newTalkers);
  return { status: 200, result: updatedTalker };
};

const deleteTalker = async (id) => {
  const { result } = await getAll();
  const newTalkers = result.filter((talker) => talker.id !== Number(id));
  if (result.length <= newTalkers.length) {
    return { status: 404, result: { message: 'Pessoa palestrante não encontrada' } };
  }
  await writeInfile(newTalkers);
  return { status: 204 };
};

const patch = async (id, rate) => {
  const { result } = await getAll();
  const { result: { message }, status } = await getById(id);
  if (message) return { status, message }; 
  const newTalkers = result.map((talker) => {
    const { talk } = talker;
    return Number(id) === talker.id ? {
        ...talker, talk: { ...talk, rate: Number(rate) },
      } : talker;
  });
  await writeInfile(newTalkers);
  return { status: 204 };
};

module.exports = { getAll, getById, create, uptade, deleteTalker, search, patch };
