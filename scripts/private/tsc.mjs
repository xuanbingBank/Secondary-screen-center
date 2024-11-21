import ChildProcess from "child_process";
import Chalk from "chalk";

function CompileTS(directory){
  console.log("Compiling", directory);
  return new Promise((resolve, reject) => {
    const tscProcess = ChildProcess.exec("tsc", {
      cwd: directory,
    });

    tscProcess.stdout.on("data", (data) => {
      process.stdout.write(Chalk.yellowBright("[tsc] ") + Chalk.white(data.toString()));
    });

    tscProcess.on("exit", (exitCode) => {
      if(exitCode > 0)
        reject(exitCode);
      else
        resolve();
    });
  });
}

export { CompileTS };
