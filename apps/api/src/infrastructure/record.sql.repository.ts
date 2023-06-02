import { RecordRepository } from "../domain/record.repository";
import { prisma } from "../../db";
import { Record } from "../domain/record";

export class RecordSqlRepository implements RecordRepository {
    async findAll(): Promise<Record[]> {
        const records: any[] = await prisma.record.findMany({
            include: {
                artist: true,
            }
        });
        return records.map((record) => ({
              id: record.id,
              name: record.name,
              genre: record.genre,
              year: record.year,
              artist: record.artist,
            } as Record));
    }
}
