module.exports = function (app) {
  app.use('/api/todos', require('./todoRoutes'));
  app.use('/api/sort', require('./sortRoutes'));
};
