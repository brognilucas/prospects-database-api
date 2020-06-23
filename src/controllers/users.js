const userFactory = require("../factory/user");
const db = require("../repository/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  signed: true
};

async function create(req, res, next) {
  const { body } = req;
  const user = await userFactory(body);
  try {
    await db.create(user);

    return res.status(201).send();
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function login(req, res) {
  const { body } = req;

  let response = await db.findUserByEmail(body.email);
  if (!response) {
    return res.status(404).send("User not found");
  }

  if (!(await validatePassword(body.password, response.password))) {
    return res.status(403).send("User and password doesnt match");
  }

  let user = {
    email: body.email,
    code: response.code,
  };

  let token = await generateToken(user);

  return res.cookie("token", token, cookieOptions).status(200).json({
    auth: true,
    user,
  });
}

async function getByCode(req, res) {
  const user = req.$user;

  return res.status(200).json(user);
}

async function get(req, res) {
  const users = await db.find();

  return res.status(200).json(users);
}

async function update(req, res) {
  const { body, $userCode: code } = req;
  if (!body.code) {
    Object.assign(body, { code });
  }

  await db.update(userFactory(body));

  return res.status(204).send();
}

async function remove(req, res) {
  const { $userCode: code } = req;
  await db.remove(code);

  return res.status(204).send();
}

async function logout(req, res) {
    return res.status(204).clearCookie('token').end();
}

async function validateSession(req, res, next) {
  const code = req.$userCode;
  let user = await db.findOne(code);
  let newToken = await generateToken(userFactory(user));

  return res.cookie("token", newToken , cookieOptions).status(200).json({ auth: true });
}

async function generateToken(user) {
  const { JWT_SECRET } = process.env;
  return jwt.sign({ ...user }, JWT_SECRET, { expiresIn: 3600 });
}

async function validatePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  create,
  validatePassword,
  login,
  logout,
  get,
  getByCode,
  update,
  remove,
  validateSession,
};
