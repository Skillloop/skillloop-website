
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';

const UploadBox = ({ label, id, onUpload, accept = 'image/*,video/*' }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validate type
    const validTypes = ['image/', 'video/'];
    const isValid = validTypes.some((type) => file.type.startsWith(type));
    if (!isValid) {
      alert('Please select a valid image or video file.');
      return;
    }

    // ✅ Preview + store type
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setFileType(file.type);

    // ✅ Upload
    try {
      const uploadedUrl = await uploadToCloudinary(file, setProgress);
      onUpload(uploadedUrl);
      toast.success("uploaded successfully")
    } catch (err) {
      console.error('Upload failed', err);
      toast.error('Upload failed.');
    }
  };

  const uploadToCloudinary = (file, setProgress) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.cloudinary.com/v1_1/dfhrlgaxw/upload`;
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my_unsigned_upload');

      xhr.open('POST', url);

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        }
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          resolve(res.secure_url);
        } else {
          reject(new Error('Upload failed.'));
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed.'));

      xhr.send(formData);
    });
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setFileType('');
    setProgress(0);
    onUpload(''); // Clear in parent too
  };

  const isImage = fileType.startsWith('image/');

  return (
    <div className="flex-1">
      <p className="mb-1 text-sm font-medium">{label}</p>

      <div className="border-2 border-dashed border-gray-300 rounded p-4 h-64 flex flex-col items-center justify-center gap-2 relative">
        <label htmlFor={id} className="cursor-pointer w-full h-full flex items-center justify-center">
          {previewUrl ? (
            isImage ? (
              <img src={previewUrl} alt="preview" className="max-h-48 object-contain rounded" />
            ) : (
              <video src={previewUrl} controls className="max-h-48 object-contain rounded" />
            )
          ) : (
            <div className="w-[250px] h-[160px] bg-[#eae8e8] flex items-center justify-center rounded">
              <FaPlusCircle className="text-8xl text-white" />
            </div>
          )}
        </label>

        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 text-red-600 text-2xl"
          >
            <IoCloseCircle />
          </button>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadBox;

