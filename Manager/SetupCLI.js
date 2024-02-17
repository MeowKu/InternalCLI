const Internal = require("./Manager");
const internal = new Internal();
const fs = require('fs');

const request = require('request');
const fs = require('fs');
const childProcess = require('child_process');

module.exports = class setupCLI {
  async Checker() {
    try {
        const filepath = 'InternalCLI'; 
        fs.exists(filepath, (err, exists) => {
          if(err) { console.error(err); return }
          if(exists) { internal.Output('Skipping the installation, Already installed.', "Info"); } 
          else {
            internal.Output("InternalCLI doesn't installed. Installing...", "Warn");
            fs.writeFile(filepath, '', (err) => {
              if(err) {
                console.error(err);
                return;
              }
              //Setup state
              const filePath = './Manager/SetupInstaller/build.bat';
              if (fs.existsSync(filePath)) {
                internal.Output("Installing...", "Warn");
                childProcess.exec(`start ${filePath}`, (err, stdout, stderr) => {
                  if (err) {
                    internal.Output(err, "Error");
                    return;
                  }
                });
              } else {
                internal.Output("Installer not found! Trying to download it...", "Error");
                const fileUrl = 'https://github.com/MeowKu/InternalUI/raw/main/build.bat';
                const fileName = 'build.bat';

                request(fileUrl).pipe(fs.createWriteStream(fileName))
                .on('close', () => {
                    
                  childProcess.exec(`cmd /c ${fileName}`, (err, stdout, stderr) => {
                    if (err) {
                      internal.Output(err, "Error");
                      return;
                    }
                  });

                  fs.unlink(fileName, (err) => {
                    if (err) throw err;
                    internal.Output("Installtion successfully! Cleaning the Installtion file...", "Warn");
                  });

                });
              }
              
              internal.Output("InternalCLI setup successfully!", "Info");
            }); 
          }
        
        });
    } catch (err) {
      internal.Output(err, "Error");
    }
  }
}
