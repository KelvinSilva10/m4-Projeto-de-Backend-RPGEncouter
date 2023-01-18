import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { Campaign } from "../../../entities/campaign.entity";
import AppDataSource from "../../../data-source";
import { mockedCampaignRequest } from "../mocks/integration/campaign.mock";
import { User } from "../../../entities/user.entity";
import { mockedUsersListRequest } from "../mocks/integration/user.mock";
import { UserCampaign } from "../../../entities/userCampaign.entity";

describe("create campaign route test", () => {
  let connetion: DataSource;
  const baseUrl: string = "/campaign";
  const campaignRepo: Repository<Campaign> =
    AppDataSource.getRepository(Campaign);

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userCampaignRepo: Repository<UserCampaign> =
    AppDataSource.getRepository(UserCampaign);

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

    const userCamp = await userCampaignRepo.find();
    await userCampaignRepo.remove(userCamp);
  });

  afterAll(async () => {
    await connetion.destroy();
  });

  it("it will not be possible to delete campaign for an id invalid", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ name: "teste2" });

    const userLoggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .delete(`${baseUrl}/123`)
      .set("Authorization", `Bearer ${userLoggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 404,
      bodyToEqual: { message: "Campaign not exist" },
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expectedResults.bodyToEqual);
  });

  it("it is possible to disable campaign successfully", async () => {
    const listUserOne = userRepo.create(mockedUsersListRequest[1]);
    await userRepo.save(listUserOne);
    const user = await userRepo.findOneBy({ name: "teste2" });

    const campaign = campaignRepo.create(mockedCampaignRequest);
    const newCampaign = await campaignRepo.save(campaign);

    const userCampaign = userCampaignRepo.create({
      user: user,
      campaign: newCampaign,
      isOwner: true,
    });
    await userCampaignRepo.save(userCampaign);

    const campaignFound = await campaignRepo.findOne({
      where: { name: mockedCampaignRequest.name },
      relations: {
        campaignPlayers: true,
      },
    });

    const campaignId = campaignFound.id;

    const userLoggedIn = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });

    const response = await request(app)
      .delete(`${baseUrl}/${campaignId}`)
      .set("Authorization", `Bearer ${userLoggedIn.body.token}`)
      .send();

    const expectedResults = {
      status: 204,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(expect.objectContaining({}));
  });
});