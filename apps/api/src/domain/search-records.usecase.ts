import { Record } from "./record";
import { RecordRepository } from "./record.repository";

export class SearchRecordsUsecase {
    private recordRepository: RecordRepository;

    constructor(RecordRepository: RecordRepository) {
        this.recordRepository = RecordRepository;
    }

    async execute(): Promise<Record[]> {
        // return all Records in db
        const Records = await this.recordRepository.findAll();
        return Records;
    }
}
