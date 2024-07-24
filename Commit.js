const fs = require("fs");
const simpleGit = require("simple-git");
const git = simpleGit();

const min = 3;
const max = 8;
const date = new Date();
const maxCommit = Math.floor(Math.random() * (max - min + 1)) + min;

async function checkCommit(fileName) {
  try {
    const log = await git.log({ file: fileName });
    return log.all.length > 0;
  } catch (error) {
    console.error("Error checking commit:", error);
    return false;
  }
}

(async () => {
  for (let i = 0; i <= maxCommit; i++) {
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
})();

// testing commit
