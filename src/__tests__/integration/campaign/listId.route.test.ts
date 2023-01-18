import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { Campaign } from "../../../entities/campaign.entity";
import AppDataSource from "../../../data-source";
import {
  mockedCampaign,
  mockedCampaignIsActiveFalse,
} from "../mocks/integration/campaign.mock";
import { User } from "../../../entities/user.entity";
import { mockedUsersListRequest } from "../mocks/integration/user.mock";

describe("list campaign successfully", () => {
  let connetion: DataSource;
  const baseUrl: string = "/campaign";
  const campaignRepo: Repository<Campaign> =
    AppDataSource.getRepository(Campaign);

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connetion = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const campaign = await campaignRepo.find();
    await campaignRepo.remove(campaign);

    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connetion.destroy();
  });

  it("list successfully campaign", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ nick: "nickTest2" });
    const userLoggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const campaign = campaignRepo.create(mockedCampaign);
    const newCampaign = await campaignRepo.save(campaign);

    const response = await request(app)
      .get(`${baseUrl}/${newCampaign.id}`)
      .set("Authorization", `Bearer ${userLoggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 200,
    };
    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("list successfully campaign", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[0]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ nick: "nickTest1" });
    const userLoggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .get(`${baseUrl}/123`)
      .set("Authorization", `Bearer ${userLoggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 404,
    };
    expect(response.status).toBe(expectedResults.status);
  });

  it("campaign must be active to search", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const userone = await userRepo.findOneBy({ nick: "nickTest2" });

    const campaign = campaignRepo.create(mockedCampaignIsActiveFalse);
    const newCampaign = await campaignRepo.save(campaign);

    const userLoggedIn = await request(app)
      .post("/login")
      .send({ email: userone.email, password: "1234" });

    const response = await request(app)
      .get(`${baseUrl}/${newCampaign}`)
      .set("Authorization", `Bearer ${userLoggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 404,
      bodyToEqual: { message: "Campaign not exist" },
    };
    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expectedResults.bodyToEqual);
  });
});
