import requestCreateUser from "../services/users/create";
import { IUserData, TRequestController } from "../interfaces";
import requestListUser, { requestUserOwner } from "../services/users/read";
import requestUpdateUser from "../services/users/update";
import requestUserDeactivition from "../services/users/delete";
import requestUserReactivation from "../services/users/reactive";

export const createUser: TRequestController = async (req, res) => {
  const user = await requestCreateUser(req.body);

  return res.status(201).json(user);
};

export const getListUsers: TRequestController = async (req, res) => {
  const listUser = await requestListUser(res.locals.user);

  return res.status(200).json(listUser);
};

export const getUserOwner: TRequestController = async (req, res) => {
  const user = await requestUserOwner(res.locals.user);

  return res.status(200).json(user);
};

export const updateUser: TRequestController = async (req, res) => {
  const userUpdated = await requestUpdateUser(req, res);

  return res.status(200).json(userUpdated);
};

export const deactivitionUser: TRequestController = async (req, res) => {
  await requestUserDeactivition(req, res);

  return res.status(204).send();
};

export const reactivationUser: TRequestController = async (req, res) => {
  const user = await requestUserReactivation(req.params, res.locals.user.admin);

  return res.status(200).json(user);
};
