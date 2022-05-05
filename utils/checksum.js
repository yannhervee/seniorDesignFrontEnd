import * as SparkMD5 from "spark-md5";

// https://dev.to/qortex/compute-md5-checksum-for-a-file-in-typescript-59a4
const fileChecksum = (file) => {
  return new Promise((resolve, reject) => {
    const chunkSize = 2097152; // Read in chunks of 2MB
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    let cursor = 0; // current cursor in file

    fileReader.onerror = () => {
      reject("MD5 computation failed - error reading the file");
    };

    // read chunk starting at `cursor` into memory
    const processChunk = (chunkStart) => {
      const chunkEnd = Math.min(file.size, chunkStart + chunkSize);
      fileReader.readAsArrayBuffer(file.slice(chunkStart, chunkEnd));
    };

    // when it's available in memory, process it
    fileReader.onload = (e) => {
      spark.append(e.target.result); // Accumulate chunk to md5 computation
      cursor += chunkSize; // Move past this chunk

      if (cursor < file.size) {
        // Enqueue next chunk to be accumulated
        processChunk(cursor);
      } else {
        // Computation ended, last chunk has been processed. Return as Promise value.
        // This returns the base64 encoded md5 hash, which is what
        // Rails ActiveStorage or cloud services expect
        // TODO: fix this deprecation notice
        resolve(btoa(spark.end(true)));

        // If you prefer the hexdigest form (looking like
        // '7cf530335b8547945f1a48880bc421b2'), replace the above line with:
        // resolve(spark.end());
      }
    };

    processChunk(0);
  });
};

export default fileChecksum;
