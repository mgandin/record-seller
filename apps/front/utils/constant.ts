import { HttpClient } from "../utils/http";

const url = process.env.RECORD_SELLER_API_URL;

export const apiHttpClient = new HttpClient(url);
