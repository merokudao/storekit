import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
