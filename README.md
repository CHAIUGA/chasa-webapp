# The CHASA Web App
![](chasa.gif)
## Introduction
The webapp is used by an end user to predict cases of disease incideinces in Uganda based on the weather parameters. It uses the [CHASA prediction model](https://github.com/CHAIUGA/chasa-model) to make the predictions and display the results as graphs/Charts.

## Pre-requisities
You need to have **Node** installed on your computer

## Set up
* Download/Pull the files to your computer
* Open command prompt on your computer and cd into the project you just downloaded
```
e.g. C:\USERS\GUEST\Desktop\chasa-webbapp
```
* Run the following command to install the required packages
```
npm install
```
or
```
yarn add
```
* Build the project with the following command
```
npm build
```
or
```
yarn build
```
* Run your application 
```
npm start
```
* Access your application in your browser
```
localhost:3000
```
**Note** The application depends on [CHASA prediction model](https://github.com/CHAIUGA/chasa-model) to get results
