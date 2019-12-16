# [Foodsta](https://deliciousfoodsta.com)
by `groupFive`

## What is it?

Foodsta is a social media platform for the sharing of pictures of good food, and of the busineses that create it. Users can upload pictures and fill in details about where they ate, what they ate,and how much they enjoyed it.

Posts can be filtered via the universal search function to search posts by restaurant, post title, cuisine, and dietary restriction. On the side is a live-updating sidebar yday displays nearby restaurants.

![foodsta_demo_gif2](server/readme_media/foodsta_2.gif)


## How was it made?

Foodsta is an Angular application with a backend running on Express.js. A SQL database-as-a-service from jawsDB serves and stores posts, created and populated using the Sequelize ORM, with migrations enabled. AWS S3 takes care of storing and serving all static files needed for the project, and EC2 runs the API server that serves those files.

Domain name and SSL services are provided via the AWS Route 53 and Elastic Load Balancer services.

Auth0 was chosen to power the authentication due to its flexibility and sheer out-of-the-box functionality.

### Technologies
* AWS S3, EC2, Route 53, ELB
* Auth0
* jawsDB
* Sequelize
* Google Places API, Google Geolocation API
* Multer
* PM2
* Angular
* JavaScript
* TypeScript
* Node.js
* HTML5
* SCSS
* Express

### `groupFive` is
  * [Emily Corracio](https://github.com/emcoraccio)
  * [Yunus Ibraham](https://github.com/Yunusib12)
  * [Michael Nos](https://github.com/mmnos)
  * [Elias Roussos](https://github.com/EliasIsaiah)



