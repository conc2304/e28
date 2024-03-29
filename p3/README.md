# Project 3 
# vyzby-app
Production URL [http://p3.joseconchello.com/](http://p3.joseconchello.com/)

## Outline of features
  This app is a tool to animate and control sketches made in p5js through the DOM as well as other auxilliary inputs.
  
  Features 
  
  * Home page has a mouse chasing p5js sketch
  * Home page has a login/out feature (so far doesnt do much)
  * Home page has a pop up with an explanation of the app
  * Visualizer view is the main content page of the app.
  * Visualizer menu has a layer selector to control individual layers
  * Visualizer menu has control that randomize and reset the parameters of each layer
  * Visualizer menu has a toggle to show/hide form fields for auxilliary input
  * Toggling the aux input shows/hides inputs to control layer parameters with keyboard strokes
  * Selecting a layer shows the layer controller menu
  * Layer controller menu is broken up into expansion lists for each parameter category
  * Layer control menu has menu buttons to: toggle visibility, randomize, and reset the layer
  * Setting the visibility to off on a layer sets a red border on that layer
  * Only one expansion list is able to open at a time
  * Expansion list contains sliders and radio buttons to control elements
  * Setting menu has audio player toggle to show/hide audio player

    
    
  In progress
  * Audio player
  * Ability for sketch parameters to respond to music
  * Ability to add new layer
  * Ability to remove existing layer
  * Ability to shift order of layers

## Outside resources
 - Vuetify https://vuetifyjs.com/en/
 - p5js https://p5js.org/
 - Vue with p5js https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33
 - Dependency Injection with Vue js https://codeburst.io/dependency-injection-with-vue-js-f6b44a0dae6d
 - No Ui Slider https://www.npmjs.com/package/vue-nouislider-fork/v/1.0.8
 - Material Icons https://material.io/resources/icons/?style=baseline


### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
