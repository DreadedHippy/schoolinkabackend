// Importing module
import postRoutes from './routes/postRoute'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

// Necessary initializations
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// Route handling
app.get('/', (req, res) => {
  res.send('Welcome to typescript backend!');
})

app.use('/api/post', postRoutes);

app.get('*', (req, res) => {
	res.status(404).json({
		message: "Route not found"
	})
})

export default app;