import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavsModule } from 'src/favs/favs.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [forwardRef(() => FavsModule), forwardRef(() => TracksModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
