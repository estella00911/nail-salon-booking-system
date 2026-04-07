import './config.js';
import { env } from "./config.js";
import app from './app.js';

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});

