const { User } = require('../../models');

const login = async (req, res) => {
  const user = await User.findOne({ where: { name: req.body.name } });
  if (user) {
    console.log(user.validPassword(req.body.password))
  } else {
    res.status(404).json({ error: 'User does not exist' });
  }
};

module.exports = {
  login,
};
