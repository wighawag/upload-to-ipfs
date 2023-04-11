import { NFTStorage } from "nft.storage";
import { filesFromPath } from "files-from-path";
import path from "path";
import fs from "fs";

import { loadEnv } from "dotenv-set";

export async function upload(directoryPath: string, outputFile?: string) {
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });

  const token = process.env.NFT_STORAGE_API_TOKEN;

  if (!token) {
    throw new Error(`env variable NFT_STORAGE_API_TOKEN  not set`);
  }
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
