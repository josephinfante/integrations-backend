import express, { Application } from "express";
import cors from "cors";
import { ACCEPTED_ORIGINS } from "../globals";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callback(null, true)
            return;
        };
        return callback(new Error('Not allowed by CORS'));
    }
}));
app.disable('x-powered-by');

app.use("/", (_req, res) => {
    res.status(200).json({ message: "api is running" });
});