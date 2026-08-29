const fs = require('fs');
const zlib = require('zlib');

// Generate a valid uncompressed / deflate-compressed 512x512 RGBA PNG
function createPng(width, height, r, g, b, a = 255) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image data: height rows, each starting with filter byte 0
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter byte: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      
      // Draw inner border or center logo rectangle
      const isCenter = x >= width * 0.3 && x <= width * 0.7 && y >= height * 0.3 && y <= height * 0.7;
      if (isCenter) {
        rawData[pixelOffset] = 16;     // R (Emerald #10B981)
        rawData[pixelOffset + 1] = 185; // G
        rawData[pixelOffset + 2] = 129; // B
        rawData[pixelOffset + 3] = 255;
      } else {
        rawData[pixelOffset] = r;     // Brand Navy #0A2540
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = a;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([length, typeAndData, crc]);
}

// CRC32 table & calculator
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Write square 512x512 and 1024x1024 icons
const navyR = 10, navyG = 37, navyB = 64; // #0A2540
const square512 = createPng(512, 512, navyR, navyG, navyB);
const square1024 = createPng(1024, 1024, navyR, navyG, navyB);

fs.writeFileSync('assets/icon.png', square512);
fs.writeFileSync('assets/adaptive-icon.png', square512);
fs.writeFileSync('assets/splash.png', square1024);
fs.writeFileSync('assets/favicon.png', createPng(48, 48, navyR, navyG, navyB));

console.log('Successfully generated square icons: 512x512, 1024x1024, 48x48');
