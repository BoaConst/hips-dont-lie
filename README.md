# Color correction App

## Build and Run the application locally

Ensure you have the latest version of node-js
1. Clone the repo
2. cd into the directory
3. Run the command `npm install` to install all the dependencies required by th application
4. To run the code `npm run start`
5. To build the code `npm run build`. This would be useful when you have to deploy the application.

## Deploy the application on Netlify

[Netlify](https://www.netlify.com/) provides free hosting for front-end application. The free version is enough for our needs. It also has the option to configure an end2end CI/CD pipeline, but here I will document how to manually deploy the application.

**Before deploying, run the build command. You should be able to see a build folder created in the same directory as where your source folder is.**

1. Create a free account on [Netlify](https://www.netlify.com/)
2. Login to your account. You should be able to see the option "Add New Site"
![image info](./images/team_overview.png)
3. Choose the option, "Deploy Manually"
4. Either drag and drop the build folder in the screen that follows or upload the folder manually.
![image info](./images/deploy.png)
5. Once the upload is completed, you will receive a public URL that you can share with others.