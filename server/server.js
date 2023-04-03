const app = require('./app');
const config = require('./utils/config');

console.table(config);

app.listen(config.PORT, () => {
  console.log(`Server running on port test ${config.PORT}`);
});


