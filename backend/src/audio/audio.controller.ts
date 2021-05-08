import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { join } from 'path';
import { of } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatusCodesEnum } from '../model/status-codes.enum';
import { StatusDto } from '../model/status.dto';
import { AudioService } from './audio.service';
import { AudioCreateDto } from '../model/audio-create.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../util/roles.decorator';
import { RolesEnum } from '../model/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, audioFileFilter } from '../util/file-uploading';
import { Audio } from '../entity/audio.entity';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './audios',
        filename: editFileName,
      }),
      fileFilter: audioFileFilter,
    }),
  )
  async addAudio(
    @Req() req,
    @UploadedFile() file,
    @Body() audio: AudioCreateDto,
  ): Promise<StatusDto> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('invalid file');
    }

    const response = await this.audioService.create(audio, file);
    return {
      status: StatusCodesEnum.CREATED,
      message: response,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  async deleteAudio(@Param('id') id: string): Promise<StatusDto> {
    await this.audioService.delete(id);
    return {
      status: StatusCodesEnum.DELETED,
      message: 'Successful deleted',
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateAudio(
    @Param('id') id: string,
    @Body() audio: AudioCreateDto,
  ): Promise<StatusDto> {
    if (await this.audioService.update(id, audio)) {
      return {
        status: StatusCodesEnum.UPDATED,
        message: 'Successful updated',
      };
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  async getAudios(): Promise<Audio[]> {
    return await this.audioService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async getAudio(@Param('id') id: string): Promise<Audio> {
    return await this.audioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id/download')
  async getAudioDownload(@Res() res, @Param('id') id: string): Promise<Object> {
    const result = await this.audioService.findOne(id);
    return of(res.sendFile(join(process.cwd(), 'audios/' + result.file)));
  }
}
