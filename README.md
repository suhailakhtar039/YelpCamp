# YelpCamp
This project is based on storing camping sites information
like image, description and name.

## Features

- Site is compatible with phone using bootstrap grid method.

- It provides user authentication using modules from npm community, hence unknown person can not manipulate your data from database.

- Apart from storing camps and showing it to public it also 
stores comment made on sites. 

- Entire data is stored on cloud so you can access your images
on any machine. Please note that it is just a demo so it can't store large data.

## Components

This project is build completely on front end as well as
backend. 

For front-end it includes html, css, javascript,
bootstrap framework and few more. Back-end is completely
built on Node.js using express. This project requires storing
images, user and comment for which database is required. Hence,
in this project mongoDB is used for database.

As this project is deployed, mongoDB can not be used any
further hence mLab is used as cloud database to store all
data like images, user, comments on cloud.

## Clone

To clone entire repository run `git clone https://github.com/suhailakhtar039/YelpCamp.git` on your machine.
## Deployement

Entire project is deployed on `heroku` with url **https://cryptic-mesa-27815.herokuapp.com/**

## Steps
1. Go to URL provided above. It will direct you to homepage.
2. On the homepage you can view yelpcamps provided by other users.
3. To enter your own camps you have to sign up using username and password. Then only you can enter your camps or make comments on other's camps
4. To log out simply click log out.
