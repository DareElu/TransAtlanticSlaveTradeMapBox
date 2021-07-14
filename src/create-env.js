const fs = require("fs");
const path = `./.env`;
const vars = `
    REACT_APP_MAPBOX_TOKEN=${process.env.REACT_APP_MAPBOX_TOKEN_NETLIFY}
`;
fs.writeFileSync(path, vars);
