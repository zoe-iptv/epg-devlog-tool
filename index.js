#!/usr/bin/env node

const { program } = require("commander");
const shell = require("shelljs");

program
  .command("start")
  .description("Start the application")
  .action(() => {
    console.log("Starting the application...");
    shell.exec("node packages/server/index.js", { async: true });
    const tmole = shell.exec("tmole 3001", { async: true });
    tmole.stdout.on('data', function(data) {
      /* ... do something with data ... */
      console.log("tmole stdout: ", data);
    });
  });

program.parse(process.argv);
