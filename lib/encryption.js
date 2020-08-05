const bcrypt = require('bcrypt');

exports.encrypt = async (payload) => {
  if (!payload) return null;
  return await bcrypt.hash(payload, 12);
};

exports.compare = async (clear, hash) => await bcrypt.compare(clear, hash);
