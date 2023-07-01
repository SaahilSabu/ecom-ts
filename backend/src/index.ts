import cors from "cors";
import express, { Request, Response } from "express";
import "dotenv/config";
import { sampleProducts } from "./data";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

app.get('/api/products/:slug', (req, res) => {
  console.log(req.params.slug)
  res.json(sampleProducts.find((x) => x.slug === req.params.slug));
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
