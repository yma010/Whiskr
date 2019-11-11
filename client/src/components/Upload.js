import React from 'react';
import { UPLOAD_FILE_STREAM } from '../graphql/mutations';
import { Mutation } from 'react-apollo'

class Upload extends React.Component {

  render()   {
    return (
      <div>
          <Mutation mutation={UPLOAD_FILE_STREAM}>
            {(singleUploadStream, { data }) => {
              console.log(data)
              return (
              <form onSubmit={() => 
                {console.log("Submitted")}} 
                encType={'multipart/form-data'}
                >
                <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                  const file = files[0]
                  file && singleUploadStream(
                    { variables: { 
                      file: file 
                    } 
                  })
                }}/>
                  <button type="submit">Upload</button>
                </form>)}
                }
          </Mutation>
      </div>
    )
  }

};

export default Upload;