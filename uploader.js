import uploadVideoToYT from './lib/youtubeUploader.js';

// Example usage
const s3Url = process.argv[2];
const caption = 'My S3 Video Upload';

if (!s3Url) {
  console.log('Please provide the S3 URL as the first argument.');
  process.exit(1);
}

uploadVideoToYT(s3Url, caption)
  .then((data) => console.log('Video upload response:', data))
  .catch((err) => console.error('Error uploading video:', err));
