import { RecordRepository } from "../domain/record.repository";
import { Record } from "../domain/record";
import { prisma } from "../../db";


export class RecordSqlRepository implements RecordRepository {

    async findAll(): Promise<Record[]> {
        const records: Record[] = await prisma.record.findMany();
        return records;
    }
}
