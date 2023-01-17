import { IUserRequest } from "../../../../interfaces/users"

const mockedUserRequest: IUserRequest = {

    name: "Zequinha",
    email: "zecs@kenzie.com",
    nick: "DragonSlayer5698",
    password: "12345678",

}

const mockedUserResponse: Omit<IUserRequest, "password"> = {

    name: "Zequinha",
    email: "zecs@kenzie.com",
    nick: "DragonSlayer5698",
}

const mockedUserInvalidBodyRequest: Omit<IUserRequest, "password" | "email"> = {

    name: "Zequinha",
    nick: "DragonSlayer5698",
}