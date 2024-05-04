const jsonServer = require('json-server');

const server = jsonServer.create();

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Для небольшой задержки, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 500);
  });
  next();
});

server.post('/data', (req, res) => {
  try {
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// запуск сервера
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
