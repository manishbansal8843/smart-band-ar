# SmartBandAr
 This repository is about how I turned my MI smart band into Augmented reality watch using Angular.

![Alt text](docs/images/Media3.gif?raw=true "AR enabled smart band")

 You can check the following article for further details.

 https://medium.com/@manishbansal8843/how-i-turned-my-mi-smart-band-into-augmented-reality-watch-using-angular-5e2d0ebe2b58

 If you own a MI smart band and want to have AR experience, you can directly visit at below link.

 https://manishbansal8843.github.io/smart-band-ar/

# For developers

The library angular-web-bluetooth which is used to connect to BLE devices has one bug. For this, I have raised one issue also. further, i have opened the PR for the same. Until that is fixed, you need to fix the issue yourself post npm install.

Issue :

https://github.com/manekinekko/angular-web-bluetooth/issues/39

Pull request:

https://github.com/manekinekko/angular-web-bluetooth/pull/40

Fix can be referred from above pull request. This fix needs to be applied inside the node modules at below path.

project_directory\node_modules\ @manekinekko\angular-web-bluetooth\fesm5\ manekinekko-angular-web-bluetooth.js

