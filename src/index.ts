import server from "./server";
import colors from "colors";

const port = process.env.PORT || 5000

server.listen(5000, () => {
  console.log(colors.cyan.bold(`REST API en el puerto ${port}`));
});
