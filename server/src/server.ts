import app from './app';
import * as config from './utils/config';

console.table(config)

app.listen(config.PORT, () => {
  console.log(`Server running on port test ${config.PORT}`);
});

