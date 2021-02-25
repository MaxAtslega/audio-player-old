import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { Repository } from "typeorm";
import {Audio} from "../entity/audio.entity";
import {AudioCreateDto} from "../model/audio-create.dto";
import {AudioUpdateDto} from "../model/audio-update.dto";

@Injectable()
export class AudioService {
    constructor(
        @Inject('AUDIO_REPOSITORY')
        private readonly audioRepository: Repository<Audio>,
    ) {}

    async create(audio: AudioCreateDto, file): Promise<Audio> {

        const audioObject: Audio = new Audio(
            audio.name, file.filename, audio.category
        );

        const data = await this.audioRepository
            .save(audioObject)
            .then((value): any => {
                return value;
            })
            .catch(() => {
                throw new InternalServerErrorException();
            });

        return data;


    }

    async update(id: string, audio: AudioUpdateDto): Promise<Audio> {

        const property = await this.audioRepository.findOne(id).catch(() => {
            throw new NotFoundException("File not found");
        });

        return this.audioRepository.save({
            ...property,
            ...audio
        }).then((): any => {
            return true;
        }).catch(() => {
            throw new InternalServerErrorException();
        });



    }

    async delete(id: string): Promise<boolean> {
        return await this.audioRepository.delete(id).then((value): any => {
            return true;
        }).catch(() => {
            throw new NotFoundException("File not found");
        });

    }
    async findOne(id: string): Promise<Audio> {
        return this.audioRepository.findOne(id).then((value): any => {
            return value;
        }).catch(() => {
            throw new BadRequestException("File not found");
        });
    }

    async findAll(): Promise<any> {
        return await this.audioRepository.find();

    }
}