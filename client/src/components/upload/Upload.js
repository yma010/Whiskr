import React from 'react';
import { UPLOAD_FILE_STREAM, NEW_PHOTO} from '../../graphql/mutations';
import { Mutation } from 'react-apollo';
import './upload.css';


class Upload extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      file: [],
      filePrev: [],
      title: '',
      description: '',
      albums: '',
      tags: [],
      imageURL: '',
      isPublic: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.persist();
    const filePrev = URL.createObjectURL(e.target.files[0]);
    const file = e.target.files[0];
    const newFileName = this.formateName(file.name)

    this.setState({
          file,
          filePrev,
          imageURL: `https://whiskr-seeds.s3-us-west-1.amazonaws.com/${newFileName}`
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    document.getElementById("upload").submit();
    document.getElementById("photoCreate").submit();
  }


  formateName(filename) {
    return filename.replace(/[ \t]/, "+");
  }

  handleClick(e) {
    e.preventDefault();
    
    this.setState({
      file: [],
      filePrev: [],
    })
    console.log(this.state.file);
  }

  render() {
    const { file } = this.state
    
    const emptyState = file.length === 0;
    let photoForm;

    if (emptyState) {
      photoForm = 
      <div id="upload-container">

        <form encType={'multipart/form-data'}>
        
        <div id="upload-subheader">

          <div className="secondary-inputs">

        <label className="upload-sub-photo-butt" htmlFor="upload-photo"> 
          <i className="icon-plus-sign"></i> Add</label>
          <input name={'document'} type={'file'} accept={"image/*,video/*,.m4v,.mkv,.m2ts,.ogg,.3gp"} onChange={this.handleChange} id="upload-photo"
          className="input-butt-small"/>
        </div>

          <button className="upload" type="submit" disabled>Upload</button>
        </div>
          <label className="upload-photo-butt" htmlFor="upload-photo">Choose photos and videos to upload</label>
          <input name={'document'} type={'file'} onChange={this.handleChange} id="upload-photo"/>
        </form>

      </div>
    } else {
      photoForm =
      <div id="upload-container-active">
          <Mutation 
            mutation={UPLOAD_FILE_STREAM}
            onCompleted={ data => {
              console.log(data);
              // this.props.history.push('/');
              
            }}>

            {singleUploadStream => (
              <form id="upload" encType={'multipart/form-data'} onSubmit={e => {
                e.preventDefault();
                const file = this.state.file;
                
                file && singleUploadStream({
                  variables: {
                    file: this.state.file     
                  }
                });  
                // console.log("Success")
              }
            }>
              <div id="upload-subheader">
                
                <div className="secondary-inputs">

                <label className="upload-sub-photo-butt" htmlFor="upload-photo"> 
                  <i className="icon-plus-sign"></i> Add</label>
                <input name={'document'} type={'file'} accept={"image/*,video/*,.m4v,.mkv,.m2ts,.ogg,.3gp"} onChange={this.handleChange} id="upload-photo"
                className="input-butt-small"/>

                <button className="remove-upload-butt" onClick={this.handleClick}><i className="icon-minus-sign"></i> Remove </button>
                </div>

                <button className="upload-active" onClick={this.handleSubmit}>Upload</button>
              </div>
              </form>
            )}    
          </Mutation>
          <div className="photo-editor">
          <Mutation
            mutation={NEW_PHOTO}
            onCompleted={data => {
              console.log(data);
            }  
          }
          >
            {newPhoto => (
              <form id="photoCreate"
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
                  })
                }}
              >
              <div className="title-desc">
              <input
                  className='title-input'
                  value={this.state.title}
                  onChange={this.update("title")}
                  placeholder={this.state.file.name}
                />
              <input
                className='desc-input'
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="Add a description"
              />
              </div>
              <label className='tags'>Tags 
              <input
                className='tags-input'
                value={this.state.tags}
                onChange={this.update("tags")}
                placeholder="Separate tags with a space"
              /></label >
              <label className='albums'>Albums 
              <input
                className='albums-input'
                value={this.state.albums}
                onChange={this.update("albums")}
                placeholder="Add to an album"
              /></label >
              
              </form>
            )}
          </Mutation>
          <div className="image-card">
            <img alt={this.state.file.name} className="upload-preview" src={this.state.filePrev}/>
          </div>
        </div>
      </div>
    }
    
    return (
      <div className="pictureUpload">
        {photoForm}
      </div>
    );
  }
};

export default Upload;

// // S3URL = https://whiskr-seeds.s3-us-west-1.amazonaws.com/{filename}

