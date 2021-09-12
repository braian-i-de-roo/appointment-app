const fs = require('fs-extra');
const {execSync} = require('child_process');
const detox = require('detox');

function downloadTestButlerAPKIfNeeded() {
  const version = '2.2.1';
  const artifactUrl = `https://repo1.maven.org/maven2/com/linkedin/testbutler/test-butler-app/${version}/test-butler-app-${version}.apk`;
  const filePath = './cache/test-butler-app.apk';
  fs.ensureDirSync('./cache');
  if (!fs.existsSync(filePath)) {
    console.log('\nDownloading Test-Butler APK...');
    execSync(`curl -f -o ${filePath} ${artifactUrl}`);
  }
}

async function globalSetup() {
  downloadTestButlerAPKIfNeeded();
  await detox.globalInit();
}

module.exports = globalSetup;
