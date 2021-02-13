import React from 'react';

// Config
import * as Config from '../../config';

// Services
import { useApi, useAuth } from '../../services';

// CSS
import './_ImageUpload.scss';

const ImageUpload = ({ defaultImage, setImage, title }) => {
  // Services
  const { uploadFile } = useApi();
  const { currentUser } = useAuth();

  const whenItChanges = async (e) => {
    const result = await uploadFile(e.target.files[0]);
    setImage(result.filename, currentUser.token);
  };

  return (
    <>
    <div className="image-upload d-flex justify-content-between">
      <div className="image-upload__field">
        <span className="image-upload__field--title">
          {title}
        </span>
        {
          defaultImage ? (
            <>
              <div className="image-upload__field--wrapper">
                <span>Wijzig afbeelding</span>
                <input type="file" accept="image/*" onChange={(e) => whenItChanges(e)}/>
              </div>
            </>
          ) : (
            <>
              <div className="image-upload__field--wrapper">
                <span>Maak afbeelding</span>
                <input type="file" accept="image/*" onChange={(e) => whenItChanges(e)}/>              
              </div>
            </>
          )
        }
      </div>
      {
        defaultImage && (
          <div className="image-upload__preview" style={{
            backgroundImage: `url(${Config.apiConfig.baseURL}file/${defaultImage})`
          }}>
          </div>
        )
      }
    </div>
    </>
  );
};

export default ImageUpload;
