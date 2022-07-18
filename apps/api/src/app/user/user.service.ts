import { Injectable } from "@nestjs/common"
import { ObjectID, Repository, UpdateResult } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

import { CreateUserDTO } from "./dto/create-user.dto"
import { UserModel } from "./user.model"
import { UpdateUserDTO } from "./dto/update-user.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>
    ) {}

    public async create(
        payload: CreateUserDTO
    ): Promise<UserModel & CreateUserDTO> {
        return this.userRepository.save(payload)
    }

    public async findAll(): Promise<UserModel[]> {
        return await this.userRepository.find()
    }

    public async findOne(id: ObjectID): Promise<UserModel> {
        return await this.userRepository.findOneBy({ id })
    }

    public async update(
        id: ObjectID,
        payload: UpdateUserDTO
    ): Promise<UpdateResult> {
        return await this.userRepository.update(id, payload)
    }

    public async remove(id: ObjectID): Promise<void> {
        await this.userRepository.delete(id)
    }
}