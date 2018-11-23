# Ganymede

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve --watch --ssl` for a dev server. Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files. The `--ssl` and https protocol are necessary for Firefox.

For firefox, exceptions need to be made for https://localhost:4200 and https://localhost:44377
1. Navigate to https://localhost:4200 while the build/watch is running
2. Click the security lock icon
3. Click the settings gear under permissions
4. Click "View Certificates" at the bottom
5. Click "Servers"
6. Click "Add Exception"
6. a) In the "Location" text box, add https://localhost:4200
   b) Click "Confirm Security Exception"
7. Repeat step 6, using "https://localhost:44377" for the location in 6a 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
