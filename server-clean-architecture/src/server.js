const app = require('./app');
const config = require('./config');

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT} trong môi trường ${config.app.environment}`);
}); 