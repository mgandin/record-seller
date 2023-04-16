import {RecordSqlRepository} from "../infrastructure/record.sql.repository";
import { RecordRepository } from "./record.repository";
import { SearchRecordsUsecase } from "./search-records.usecase";

export type RecordContainer = {
  searchRecordsUsecase: SearchRecordsUsecase;
}

export const initRecordContainer = (): RecordContainer =>  {
    const recordRepository: RecordRepository = new RecordSqlRepository();
    const searchRecordsUsecase: SearchRecordsUsecase = new SearchRecordsUsecase(recordRepository);

    return {
      searchRecordsUsecase,
    }
}