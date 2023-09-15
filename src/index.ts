import express from 'express';
import cors from 'cors';

import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => res.send('test'));
app.use("/api", router);

// set port, listen for requests
app.listen(3000, () => {
    console.log(`Server is running on port 3000.`);
});
