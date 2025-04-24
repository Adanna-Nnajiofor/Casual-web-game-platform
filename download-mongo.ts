import { MongoBinary } from "mongodb-memory-server-core";

(async () => {
  const path = await MongoBinary.getPath();
  console.log(`MongoDB binary downloaded at: ${path}`);
})();
