import { hashSync } from "bcryptjs";
import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdateRequest,
} from "../interfaces/users";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(4).required(),
  isAdm: yup.boolean().required(),
});

const userWithoutPasswordSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    id: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    isActive: yup.boolean().notRequired(),
    isAdm: yup.boolean().notRequired(),
  });

const userUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
});

const userWithoutPasswordUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
});

export { userSerializer, userWithoutPasswordSerializer, userUpdateSerializer };
