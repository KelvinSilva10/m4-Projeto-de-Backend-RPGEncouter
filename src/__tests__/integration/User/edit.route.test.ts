import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";
import {
  mockedUsersListRequest,
  mockedUsersListResponse,
} from "../mocks/integration/user.mock";
import { sign } from "jsonwebtoken";

describe("Edit user route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/users";
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await conn.destroy;
  });

  it("Should be able to edit an user", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const userloggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}`)
      .set("Authorization", `Bearer ${userloggedIn.body.token}`)
      .send({ nick: "nickTest1Edited" });

    const expectedResults = {
      status: 200,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        nick: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        isActive: expect.any(Boolean),
        profileImg: expect.any(String),
      })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );

    const [userEdited, amount] = await userRepo.findAndCount();
    expect(amount).toBe(1);
  });

  it("Should not be able to edit an user with missing token", async () => {
    const listUser1 = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUser1);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });

    const response = await request(app)
      .patch(`${baseUrl}/${user.id}`)
      .send({ nick: "nickTest1Edited" });

    const expectedResponse = {
      status: 401,
      bodyToEqual: { message: "Invalid token" },
    };

    expect(response.status).toBe(expectedResponse.status);
    expect(response.body).toStrictEqual(expectedResponse.bodyToEqual);
  });

  //   it("Should not be able to edit an user that doesn't exists")

  //   it("Should not be able to edit an user not active")
});
