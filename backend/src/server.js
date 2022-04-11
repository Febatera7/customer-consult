const app = require('./app');
require('dotenv/config');

app.listen(process.env.PORT || 3750, () => {
    console.info(`Server running on port ${process.env.PORT || 3750}`);
});
