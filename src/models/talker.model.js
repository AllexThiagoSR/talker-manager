const fs = require('fs/promises');

const getAll = async () => {
  try {
    const talkers = await fs.readFile('src/talker.json');
    return { status: 200, result: JSON.parse(talkers) };
  } catch (error) {
    return { status: 500, message: 'INTERNAL SERVER ERROR, file not found' };
  }
};

module.exports = { getAll };
