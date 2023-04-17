import {afterEach, describe, expect, test, vi} from 'vitest'
import {SearchRecordsUsecase} from "../../src/domain/search-records.usecase";
import {Record} from '../../src/domain/record';

describe('Find records Usecase - test', () => {
    const recordRepositoryMock = {
        findAll: vi.fn()
    }

    const searchRecordUsecase = new SearchRecordsUsecase(recordRepositoryMock)

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should find all records ', async () => {
        // GIVEN
        const expectedrecord: Record = {
            id: 1,
            name: 'Tweez',
            genre: 'post-rock',
            artist: 'Slint',
            year: 1989
        }
        recordRepositoryMock.findAll.mockImplementation(() => [expectedrecord])

        // WHEN
        const records = await searchRecordUsecase.execute()

        // THEN
        expect(recordRepositoryMock.findAll).toHaveBeenCalledOnce()
        expect(records).toStrictEqual([expectedrecord]);
    })
})