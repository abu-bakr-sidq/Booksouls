const { spawn } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const children = [];

function runApp(name, cwd, args) {
  const child =
    process.platform === "win32"
      ? spawn(process.env.ComSpec || "cmd.exe", ["/c", "npm.cmd", ...args], {
          cwd,
          stdio: "inherit",
        })
      : spawn("npm", args, {
          cwd,
          stdio: "inherit",
        });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      shutdown(code);
    }
  });

  children.push(child);
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

runApp("backend", path.join(rootDir, "back-end"), ["run", "dev"]);
runApp("frontend", path.join(rootDir, "front-end"), ["run", "dev"]);
