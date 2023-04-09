const app = require('./app');
const config = require('./utils/config');

<<<<<<< snippet-processing
=======
console.table(config)

>>>>>>> main
app.listen(config.PORT, () => {
  console.log(`Server running on port test ${config.PORT}`);
});

