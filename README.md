# ExperimentPrimeng

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Before you begin

* In INTELLIJ, Open Project Structure (`Ctrl+alt+Shift+F4`) and choose Import module -> experiment-primeng-boot -> import from maven
* Run `npm i` to install all node dependencies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Backend
The backend for this project is a Spring Boot application:
https://github.com/atrifyllis/spring-boot-startup

For development purposes you can run the backend as any spring application (run the Main class SpringBootStartupApplication.class)

# Experiment PrimeNg Boot

This project is used to be able to deploy the UI application in production. It creates a spring boot jar which contains the static bundle files of the Angular CLI buld.
A Zuul proxy is used to proxy all requests to the backend, including REST calls and login.

To create the jar you just need to run `mvn install`.
You can also run the jar directly by running `mvn spring-boot:run`

In both cases maven is used to run npm script for building the angular application and copies all static resources in the static folder of the spring boot app.

## Production

Running with spring profile 'prod' will run in HTTPS mode

###Backend production

The backend can be used in production mode (see README file of backend project).


#Notes
Udpate package.json:
npm install -g npm-check-updates
ncu -u
npm install
