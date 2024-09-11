import axios from 'axios';
import { google } from 'googleapis';
import readline from 'readline';
import { authenticate } from './auth.js';

async function uploadVideoToYT(s3Url, caption) {
  const auth = await authenticate();
  google.options({ auth });

  const response = await axios({
    method: 'get',
    url: s3Url,
    responseType: 'stream',
  });

  const contentLength = response.headers['content-length'];

  const videoMetadata = {
    snippet: {
      title: caption,
      description: '',
      tags: ['SampleTag'],
      categoryId: '15',
    },
    status: {
      privacyStatus: 'public',
      selfDeclaredMadeForKids: false,
    },
  };

  const res = await google.youtube('v3').videos.insert(
    {
      part: 'snippet,status',
      requestBody: videoMetadata,
      media: { body: response.data },
    },
    {
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / contentLength) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  );

  console.log('\nUpload complete:', res.data);
  return res.data;
}

export default uploadVideoToYT;
