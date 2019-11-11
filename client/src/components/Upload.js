import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { compose, gql, graphql } from 'react-apollo';

class Upload extends React.Component {
  state = {
    title = "",
    file: null
  }


  onDrop = async files => {
    this.setState({ files: files[0]});
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
  }

  formatFileName = filename => {
    const date = moment().format("YYYYMMDD");
    const randString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, "-"); //regexp here states to replace all spaces with a "-"
    const newFilename = `images/${date}-${randString}-${cleanFilename}`;
    return newFilename.substring(0,60);
  };

  submit = async () => {
    const {name, file} = this.state;
    const resp = await this.props.s3Sign({
      variables: {
        filename: this.formatFileName(file.name),
        filetype: file.type
      }
    });

    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(file, signedRequest);

    const graphQLResp = await this.props.newPhoto({
      variables: {
        title,
        imageURL: url
      }
    });
  }

  render()   {
    return (
      <div>
        <input name="title" onChange={this.onChange} value={this.state.title} />
          <Dropzone onDrop={this.onDrop}>
            <p>You can upload 1000 more photos and videos.</p>
            <p> Drag & drop photos and videos here</p>
          </Dropzone>
      </div>
    )
  }

};