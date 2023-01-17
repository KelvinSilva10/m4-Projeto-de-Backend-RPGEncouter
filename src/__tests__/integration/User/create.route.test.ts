import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { User } from "../../../entities/user.entity";
import AppDataSource from "../../../data-source";

describe("Create user route tests", () => {
    let conn: DataSource
    const baseUrl: string = "/users"
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    beforeAll(async () => {

        await AppDataSource.initialize()
            .then((res) => (conn = res))
            .catch((err) => console.error(err))
    })

    beforeEach(async () => {

        const users = await userRepo.find()
        await userRepo.remove(users)
    })

    afterAll(async () => {

        await conn.destroy
    })

    it("Should be able to create user", async () => {
        
    })
})