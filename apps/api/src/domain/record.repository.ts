import { Record } from "./record";

export interface RecordRepository {
    findAll(): Promise<Record[]>
}