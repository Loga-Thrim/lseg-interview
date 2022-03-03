const request = require("request");

const cj = request.jar();
cj.setCookie("hasCookie=true", "https://codequiz.azurewebsites.net/");
request(
  "https://codequiz.azurewebsites.net/",
  { jar: cj },
  (error, response, body) => {
    if (!error) {
      try {
        const value = process.argv.slice(2)[0];
        body = body
          .slice(body.indexOf("<table>") + 7, body.indexOf("</table>"))
          .split("<tr>")
          .slice(2)
          .map((e) =>
            e.split("<td>").join("").split(" ").join("").split("</td>")
          );
        body = body
          .map((e) => ({ [e[0]]: e[1] }))
          .find((e) => Object.keys(e) == value)[value];
        console.log(body);
      } catch (e) {
        console.log("not found");
      }
    }
  }
);
