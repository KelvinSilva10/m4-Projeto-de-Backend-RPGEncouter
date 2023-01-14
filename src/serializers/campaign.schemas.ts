import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser } from "./../interfaces/users/index";
import {
  ICampaignRequest,
  ICampaignUpdateRequest,
} from "../interfaces/campaign";

const campaignSerializer: SchemaOf<ICampaignRequest> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  rpgGame: yup.string().required(),
  campaignImg: yup.string().notRequired().url(),
  plataform: yup.string().required(),
});

const campaignUpdateSerializer: SchemaOf<ICampaignUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    rpgGame: yup.string().notRequired(),
    campaignImg: yup.string().notRequired().url(),
    plataform: yup.string().notRequired(),
  });

// const userWithoutPasswordSerializer: SchemaOf<IUserResponse> = yup
//   .object()
//   .shape({
//     id: yup.string().notRequired(),
//     name: yup.string().notRequired(),
//     nick: yup.string().notRequired(),
//     email: yup.string().email().notRequired(),
//     createdAt: yup.date().notRequired(),
//     updatedAt: yup.date().notRequired(),
//     isActive: yup.boolean().notRequired(),
//     profileImg: yup.string().notRequired().url(),
//   });

// const userUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
//   name: yup.string().notRequired(),
//   email: yup.string().email().notRequired(),
//   password: yup.string().notRequired(),
//   nick: yup.string().notRequired(),
//   profileImg: yup.string().notRequired().url(),
// });

// const userWithoutPasswordUpdateSerializer: SchemaOf<IUserUpdateResponse> = yup
//   .object()
//   .shape({
//     name: yup.string().notRequired(),
//     email: yup.string().email().notRequired(),
//     nick: yup.string().notRequired(),
//     profileImg: yup.string().notRequired().url(),
//   });

//   const campaignSerializer: SchemaOf<IUserRequest> = yup.object().shape({
//     name: yup.string().required(),
//     nick: yup.string().required(),
//     email: yup.string().email().required(),
//     password: yup.string().min(4).required(),
//     profileImg: yup.string().notRequired().url(),
//   });

// export {
//   userSerializer,
//   userWithoutPasswordSerializer,
//   userUpdateSerializer,
//   userWithoutPasswordUpdateSerializer,
// };

export { campaignSerializer, campaignUpdateSerializer };
