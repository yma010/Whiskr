import React from 'react';
import { UPLOAD_FILE_STREAM } from '../../graphql/mutations';
import { Mutation } from 'react-apollo';
import './upload.css';

class Upload extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.persist();
    const file = e.target.files[0];
    this.setState ({ file });
  }

  render() {
    
    return (
      <div className="pictureUpload">
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
                }                 
              }>
              <input name={'document'} type={'file'} onChange={this.handleChange}/>
                <button type="submit">Upload</button>
              </form>
            )}    
          </Mutation>
      </div>
    );
  }
};

export default Upload;

// // S3URL = https://whiskr-seeds.s3-us-west-1.amazonaws.com/{filename}

