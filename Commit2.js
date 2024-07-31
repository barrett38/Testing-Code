const fs = require("fs");
const simpleGit = require("simple-git");
const git = simpleGit();
const readline = require("readline");

const date = new Date();

async function checkCommit(fileName) {
  try {
    const log = await git.log({ file: fileName });
    return log.all.length > 0;
  } catch (error) {
    console.error("Error checking commit:", error);
    return false;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("How many commits would you like to make? ", async (answer) => {
  const numCommits = parseInt(answer, 10);

  if (isNaN(numCommits) || numCommits <= 0) {
    console.log("Please enter a valid number greater than 0.");
    rl.close();
    return;
  }

  for (let i = 0; i < numCommits; i++) {
    const fileName = `./TXT-Files/file${i}.txt`;
    const txtOfFile = `This is file number ${i} created at ${date}`;

    fs.writeFileSync(fileName, `${txtOfFile}`);

    await git.add(fileName);
    await git.commit(`Commit number ${i}`);
    console.log(`Pushed ${fileName} to given repo.`);

    const isCommitted = await checkCommit(fileName);
    console.log(`${fileName} committed? ${isCommitted}`);
  }

  // Push all the files to remote repository
  await git.push("origin", "main");

  rl.close();
});
