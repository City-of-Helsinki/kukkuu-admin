import React from 'react';
import type { ImageInputProps } from 'react-admin';
import { ImageInput, ImageField, useTranslate } from 'react-admin';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Box from '@mui/material/Box';

/**
 * Ensure that the preview works after user chooses image from their computer
 * Inspired by:
 * https://github.com/marmelab/react-admin/issues/2077#issuecomment-516821629
 * @param value Url from backend or File from ImageField
 */
function formatImage(value: string | File) {
  if (typeof value === 'string') {
    // Value is null or the url string from the backend,
    // wrap it in an object so the form input can handle it
    return { image: value };
  } else {
    // A new image is selected which results in a value object
    // already having a preview link under the url key
    return value;
  }
}

type ImageUploadFieldProps = {
  name?: string;
  edit: boolean;
  image: string;
} & Pick<ImageInputProps, 'source' | 'helperText' | 'maxSize'>;

/**
 * Maximum supported file size for image uploads in bytes.
 * This is set to 1MB (1,000,000 bytes) as a hard limit.
 * This limit is enforced to ensure compatibility
 * with the backend and to prevent large uploads that could
 * lead to performance issues.
 * See Ngingx configuration for file upload limits:
 * https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size.
 * See also Django settings for file upload limits:
 * https://docs.djangoproject.com/en/5.2/ref/settings/#std-setting-DATA_UPLOAD_MAX_MEMORY_SIZE
 * and https://docs.djangoproject.com/en/5.2/ref/settings/#file-upload-max-memory-size.
 */
const MAX_SUPPORTED_FILE_SIZE_BYTES = 1_000_000; // 1MB

/**
 * Image upload field component for React Admin forms.
 * It handles both displaying the image and uploading a new one.
 *
 * The maxSize prop is enforced to not exceed `MAX_SUPPORTED_FILE_SIZE_BYTES`,
 * which is also the default value.
 */
const ImageUploadField = ({
  name,
  edit: isEditViewActive,
  image,
  source,
  helperText,
  maxSize = MAX_SUPPORTED_FILE_SIZE_BYTES,
}: ImageUploadFieldProps) => {
  const translate = useTranslate();

  // State to track if the image is persisted in the backend
  // This is used to determine if the image preview should be formatted
  // or if it should show the newly uploaded image.
  // If the form is in edit mode, we assume the image is already persisted.
  const [isImagePersisted, setIsImagePersisted] =
    React.useState(isEditViewActive);

  // Enforce the hard limit on the maxSize prop
  if (maxSize > MAX_SUPPORTED_FILE_SIZE_BYTES) {
    throw new RangeError(
      `ImageUploadField: 'maxSize' (${maxSize} bytes) cannot be larger than the ` +
        `maximum supported file size of ${MAX_SUPPORTED_FILE_SIZE_BYTES} bytes (1MB). ` +
        `Adjust backend/server settings if you need to support larger files.`
    );
  }

  // The preview immage needs different configuration when handling a newly uploaded image
  // and image that is already in the backend.
  const onChangeHandler = () => setIsImagePersisted(false);

  return (
    <ImageInput
      name={name ?? source}
      format={isImagePersisted ? formatImage : undefined}
      source={image}
      label={'events.fields.image.label'}
      accept="image/*"
      placeholder={
        <Box display="inline-flex" alignItems="center">
          <InsertPhotoIcon />
          {translate('events.fields.imageInput.label')}
        </Box>
      }
      helperText={helperText}
      maxSize={maxSize}
      onChange={onChangeHandler}
    >
      <ImageField source={isImagePersisted ? source : 'src'} title="title" />
    </ImageInput>
  );
};

export default ImageUploadField;
