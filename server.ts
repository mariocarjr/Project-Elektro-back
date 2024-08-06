import express from 'express';
import configDotenv from './src/config/dotenv';
// import cors from 'cors';
import userRoutes from '../Elektro-back/src/routes/user.routes';
import productRoutes from '../Elektro-back/src/routes/product.routes';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
//app.use(cors());
//app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
    
