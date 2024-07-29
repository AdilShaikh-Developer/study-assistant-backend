import { App } from "./app.js";
import { DatabaseConnection } from "./database/database.js";

DatabaseConnection();

App.listen(process.env.PORT, () => {
  console.log(`App is listening on PORT ${process.env.PORT}`);
});
