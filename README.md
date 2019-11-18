# Whiskr

[Live site ](http://whiskr.herokuapp.com)

## Background and Overview

Whiskr is a site inspired by Flickr to unite the internet’s legions of cat lovers and their photos. 

Whiskrians can upload pictures of their lovely, furry friends and share them with the other millions of cat lovers around the world!

--------------------

## Functionality and MVP

* User auth
    *  Users can sign up and sign in
*  Photos
    *  Users can view photos.
    *  Logged in users can upload photos.
*  Albums
    *  Users can view albums of photos.
    *  Logged in users can create albums of photos.
*  Comments
    *  Users can view comments.
    *  Logged in users can comment on photos.

-----------------

## Technologies and Technical Challenges
 * AWS S3 -- for photo storage
 * MERN stack (MongoDB, Express, React and Node)
 * React hooks 
 * Apollo
 * GraphQL
 * Docker

#### Challenges

Time constraints, workload and lack of resources on documentation for GraphQL-AWS file upload. 

---------------

## Features

#### Users

![alt text](https://i.imgur.com/jtT4MbB.png)

User can create an account or sign in to the site via the login page. 

#### Photo Index
![alt text](https://i.imgur.com/7t7k6Dt.png)

Photo Index offers  the users  a collection of photos with easy access to the photographer's photostream and the photo show page modal and comments.

#### Photo Show Page
![alt text](https://i.imgur.com/DNWry13.png)

Users open the modal show page by clicking on the picture: this action displays  the image in a larger format, and the photo’s information is displayed on hover.


#### Explore, Recent Photos and Trending

![alt text](https://i.imgur.com/9c3bhtF.png)

Explore offers users the most recent photos in the site or  the most trendy. The user can explore the page by clicking on the pictures and visiting the album for that photo.	


--------------

## Group Members and Work Breakdown

[Noah Levin](https://github.com/nllevin)

[Marvin Ma](https://github.com/yma010)

[Frida Pulido](https://github.com/FridaPolished)

* Day 1
    * Database setup
    * User Auth
    * Backend models and GraphQL Schema
* Day 2
    * Navbar component
    * Session forms
* Day 3
    * Photo Index component
    * Dockerfile
    * Photo upload
* Day 4
    * Comments component
    * PhotoIndexItem
    * Seeding
    * Photo upload
* Day 5
    * Explore 
    * Album component
    * Photo upload
* Day 6 and 7
    * Album component
    * Reviews and corrections
