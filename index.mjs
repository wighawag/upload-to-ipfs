import { NFTStorage } from "nft.storage";
import { filesFromPath } from "files-from-path";
import path from "path";
import fs from "fs";

const token = process.env.NFT_STORAGE_API_TOKEN;

async function main() {
  if (process.argv.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <directory-path> [<output file>]`
    );
    process.exit(1);
  }

  const outputFile = process.argv.length > 3 ? process.argv[3] : undefined;

  const directoryPath = process.argv[2];
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });

  const storage = new NFTStorage({ token });

  // console.log(`storing file(s) from ${directoryPath}...`);
  const cid = await storage.storeDirectory(files);
  // console.log({ cid });

  const status = await storage.status(cid);
  // console.log(status);

  if (outputFile) {
    fs.writeFileSync(outputFile, JSON.stringify(status));
  } else {
    console.log(`CID=${cid}`);
  }
}
main();
