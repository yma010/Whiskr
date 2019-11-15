import React from 'react';
import { UPLOAD_FILE_STREAM } from '../../graphql/mutations';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';
import './upload.css';

class Upload extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      file: [],
      filePrev: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);
  }

  handleChange(e) {
    e.persist();
    const filePrev = URL.createObjectURL(e.target.files[0]);
    const file = e.target.files[0];
    console.log(e.target.files[0].name);
    this.setState ({ file, filePrev });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      file: [],
      filePrev: []
    })
  }
  // formateFileName(file)

  // handleDrop(e) {  //Implement in Future
  //   e.persist();
  //   const file = e.target.files[0];
  //   this.setState({ file });
  // }

  render() {
    const { file } = this.state
    console.log(file);
    const emptyState = file.length === 0;
    let photoForm;

    if (emptyState) {
      photoForm = 
      <div id="upload-container">
          <Mutation 
            mutation={UPLOAD_FILE_STREAM}
            >
            {singleUploadStream => (
              <form encType={'multipart/form-data'} onSubmit={e => {
                e.preventDefault();
                const file = this.state.file;

                file && singleUploadStream({
                  variables: {
                    file: this.state.file     
                    }
                  });  
                }                 
              }>
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
            )}    
          </Mutation>
      </div>
    } else {
      photoForm =
      <div id="upload-container">
          <Mutation 
            mutation={UPLOAD_FILE_STREAM}>
            {singleUploadStream => (
              <form encType={'multipart/form-data'} onSubmit={e => {
                e.preventDefault();
                const file = this.state.file;

                file && singleUploadStream({
                  variables: {
                    file: this.state.file     
                    }
                  });  
                  console.log("Success")
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

                <button className="upload-active" type="submit">Upload</button>
              </div>
                <img className="upload-preview" src={this.state.filePrev}/>
              </form>
            )}    
          </Mutation>
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

