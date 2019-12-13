# Whiskr

[Live site ](http://whiskr.herokuapp.com)

## Background and Overview

Whiskr is a site inspired by Flickr to unite the internet’s legions of cat lovers and their photos. 

Whiskrians can upload pictures of their lovely, furry friends and share them with the other millions of cat lovers around the world!

## Technologies 
 * AWS S3 -- for photo storage
 * MERN stack (MongoDB, Express, React and Node)
 * React hooks 
 * Apollo
 * GraphQL
 * Docker

## Features

#### Users

![alt text](https://i.imgur.com/jtT4MbB.png)

User can create an account or sign in to the site via the login page. 

#### Photo Index
![alt text](https://i.imgur.com/7t7k6Dt.png)

Photo Index offers  the users  a collection of photos with easy access to the photographer's photostream and the photo show page modal and comments. Photo index includes infinite scroll.

#### Photo Show Page
![alt text](https://i.imgur.com/DNWry13.png)

Users open the modal show page by clicking on the picture: this action displays  the image in a larger format, and the photo’s information is displayed on hover.


#### Explore, Recent Photos and Trending

![alt text](https://i.imgur.com/9c3bhtF.png)

Explore offers users the most recent photos in the site or  the most trendy. The user can explore the page by clicking on the pictures and visiting the album for that photo.	Explore also includes infinite scroll.


--------------
### Code Sample

The following code uses a useState React hook to implement a carousel photo display.
```javascript
 const [activeIndex, setIndex] = useState();
  const {loading, error, data} = useQuery(FETCH_ALBUM_FROM_PHOTO, {
    variables: { _id: props.match.params.id }
  });
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }
  let {albums } = data.photo;
  let album = albums[albums.length - 1];
  let start = album.photos.findIndex(obj => obj._id === props.match.params.id);
  
  if(activeIndex === undefined){
    setIndex(start);
  }

  ...
```
<!-- Add more information -->
Fetching all the photos of our site is time and space consuming, this is why we created a function to help with a gradual fetching to achieve infinite scroll functionality.
```javascript
useEffect(function() {
    if (data) {
      window.onscroll = debounce(() => {
        if (document.body.clientHeight - window.scrollY < 3000) {
          window.onscroll = null;
          fetchMore({
            variables: { limit: photoBatch, offset: data.photos.length },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                photos: [...prev.photos, ...fetchMoreResult.photos]
              });
            }
          })
        }
      }, 200);
    }
    return () => window.onscroll = null;
  });
```
<!-- Add more information about Upload -->
 GraphQL mutation for upload. 
```javascript

export const UPLOAD_FILE_STREAM = gql `
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
```


--------------

## Group Members

[Noah Levin](https://github.com/nllevin)

[Marvin Ma](https://github.com/yma010)

[Frida Pulido](https://github.com/FridaPolished)
