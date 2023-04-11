import { upload } from ".";

function main() {
  if (process.argv.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <directory-path> [<output file>]`
    );
    process.exit(1);
  }

  const outputFile = process.argv.length > 3 ? process.argv[3] : undefined;

  const directoryPath = process.argv[2];

  upload(directoryPath, outputFile);
}

main();
