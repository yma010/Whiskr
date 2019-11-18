import React from 'react';
import { NEW_PHOTO } from '../../graphql/mutations';
import { Mutation } from 'react-apollo';
import Upload from '../upload/Upload';

class PhotoCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      albums: '',
      tags: [],
      imageURL: '',
      isPublic: true
    }
    console.log(this.state)
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }


  render(){
    
    // const createNewPhoto = 
    //   <Mutation
    //     mutation={NEW_PHOTO}
    //   >
    //     {newPhoto => {
    //       <form
    //         onSubmit = {e => {
    //           e.preventDefault();
    //           newPhoto({
    //             variables: {
    //               title: this.state.title,
    //               description: this.state.description,
    //               albums: this.state.albums,
    //               tags: this.state.tags,
    //               imageURL: this.state.imageURL,
    //               isPublic: this.state.isPublic
    //             }
    //           });
    //         }}
    //       > 
    //       </form>
    //     }}

    //   </Mutation>

    return(
      <div className="createPhoto">
        < Mutation
            mutation={NEW_PHOTO}
          >
            {newPhoto => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  newPhoto({
                    variables: {
                      title: this.state.title,
                      description: this.state.description,
                      albums: this.state.albums,
                      tags: this.state.tags,
                      imageURL: this.state.imageURL,
                      isPublic: this.state.isPublic
                    }
                  });
                }}
              > 

              <input
                value={this.state.title}
                onChange={this.update("title")}
                placeholder={this.state.file[0].name}>
                </input>

              <input
                value={this.state.description}
                onChange={this.update("description")}
                placeholder={this.state.file[0].name}>
                </input>

              <input
                value={this.state.title}
                onChange={this.update("title")}
                placeholder={this.state.file[0].name}>
              </input>
              </form>
            )}

          </Mutation>
        <Upload/>
      </div>
    );
  }
}

export default PhotoCreate;