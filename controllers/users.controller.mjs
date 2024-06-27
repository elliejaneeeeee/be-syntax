import { findUsers, findUser, insertUser } from "../models/users.model.mjs";
import { isValidId } from "../utils/isValidId.mjs";
import { isAllFieldsValid } from "../utils/isAllFieldsValid.mjs";

export const getAllUsers = async (req, res, next) => {
  const users = await findUsers();
  res.status(200).send({ users });
};

export const getAUser = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).send({ msg: "400 Error: Bad Request" });
  }

  const user = await findUser(id);

  if (user.length === 0) {
    return res.status(404).send({ msg: "404 Error: Resource Not Found" });
  }
  res.status(200).send({ user });
};

export const postUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!isAllFieldsValid(email, username, password)){
    return res.status(400).send({ msg: "400 Error: Bad Request" })
  }

  await insertUser(username, email, password);
  res.status(201).send({ msg: "201: Successfully Created Resource" });
};
