import {beforeAll, describe, expect, expectTypeOf, test} from 'vitest'
import {prisma} from "../../db";
import {RecordSqlRepository} from "../../src/infrastructure/record.sql.repository";

describe('Train Repository - test', () => {
    const recordRepository = new RecordSqlRepository()

    beforeAll(async () => {
        await prisma.record.deleteMany()
    })

    test('#findall', async () => {
        // GIVEN
        const inserted = await prisma.record.create({
          data: {
            name: 'Tweez',
            genre: 'post-rock',
            artist: 'Slint',
            year: 1989
          },
        });
        const expectedrecord = {
          id: inserted.id,
          name: 'Tweez',
          genre: 'post-rock',
          artist: 'Slint',
          year: 1989
      }

        // WHEN
        const records = await recordRepository.findAll()

        // THEN
        expect(records).toEqual([expectedrecord]);
    })
})