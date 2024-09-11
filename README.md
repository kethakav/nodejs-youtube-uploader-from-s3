# Node.js YouTube Uploader from S3

This project provides a Node.js script to automate uploading videos to YouTube directly from a public URL (e.g., an S3 bucket URL) using YouTube's Data API v3. It leverages Google OAuth2 for authentication.

## Background
Uploading videos to YouTube directly from a public URL using Node.js can be challenging, especially since most existing guides focus on Python or outdated Node.js methods. This project provides a clear Node.js solution to simplify the process of uploading videos from public URLs.

## Features
- Upload videos from a public URL (e.g., AWS S3) to YouTube
- Authenticate via Google OAuth2
- Easy-to-modify methods for custom needs

## Prerequisites
1. **Node.js** (v14.x or higher) installed
2. **Google Cloud Project** set up with OAuth 2.0 credentials
3. **YouTube Channel** created before running the script
4. **Public Video URL** ready (e.g., S3 URL or any public link containing the video)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/kethakav/nodejs-youtube-uploader-from-s3.git
cd nodejs-youtube-uploader-from-s3
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Google Cloud Credentials
- Create a Google Cloud Project at [Google Cloud Console](https://console.cloud.google.com/).
- Enable the **YouTube Data API v3** for your project.
- Generate OAuth 2.0 credentials.
- Download the `client_secret.json` and save it in the `keys` folder as `oauth2.keys.json`. The `keys` folder is not included in the repo due to `.gitignore`.

### 4. Configure OAuth 2.0 Credentials
Ensure your file structure looks like this:
```
/nodejs-youtube-uploader-from-s3
  /keys
    oauth2.keys.json
  /lib
    auth.js
    youtubeUploader.js
  package.json
  uploader.js
```

### 5. First-Time Script Authorization
When running the script for the first time, you will be prompted to authorize the app:
1. Open the provided URL in your browser.
2. Grant access to the application.
3. Copy the entire redirect URL from your browser’s address bar after authorization.
4. Paste the redirect URL back into the terminal.

### 6. Run the Script with Video URL
Provide the public URL of the video file when running the script. This can be an S3 URL or any other public URL pointing to the video file you want to upload.

```bash
node uploader.js "your-public-video-url"
```

Example:
```bash
node uploader.js "https://your-s3-bucket.s3.amazonaws.com/video.mp4"
```

### Important Notes
- Ensure that the video URL is **publicly accessible** before running the script.
- The URL doesn't have to be an S3 URL; any public URL pointing to a valid video file will work.

### Modifying for Your Needs
The key methods are located in `auth.js` and `youtubeUploader.js`. You can modify these methods to suit your project’s needs:
- **`uploadVideo`**: Handles uploading videos to YouTube. Modify it for different input sources or metadata.
- **`getAuth`**: Handles Google OAuth2 authorization. This can be extended for other Google API interactions.

### Troubleshooting
- Ensure your YouTube channel is created before running the script.
- If you encounter errors during the OAuth process, verify that your credentials are correct and that the redirect URIs match those set in your Google Cloud project.
- Check that the public video URL is valid and accessible.

## Contributing
We welcome contributions! Feel free to submit issues, fork the repo, and send pull requests.

### How to Contribute
1. Fork the repo.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Submit a pull request!

## License
This project is licensed under the MIT License.

---

Happy coding!
