import {beforeAll, describe, expect, test} from 'vitest'
import {prisma} from "../../db";
import {RecordSqlRepository} from "../../src/infrastructure/record.sql.repository";

describe('Record Repository - test', () => {
    const recordRepository = new RecordSqlRepository()

    beforeAll(async () => {
        await prisma.record.deleteMany()
    })

    test('#findall', async () => {
        // GIVEN

        const insertedArtist = await prisma.artist.create({
          data: {
            name: 'Slint'
          }
        })
        const insertedRecord = await prisma.record.create({
          data: {
            name: 'Tweez',
            genre: 'post-rock',
            year: 1989,
            artistId: insertedArtist.id
          },
        });
        const expectedrecord = [{
          id: insertedRecord.id,
          name: 'Tweez',
          genre: 'post-rock',
          year: 1989,
          artist: {
            id: insertedArtist.id,
            name: 'Slint'
          }
        }];

        // WHEN
        const records = await recordRepository.findAll()

        // THEN
        expect(records).toEqual(expectedrecord);
    })
})