import React, { useState } from 'react';
import axios from 'axios';

const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    desc: '',
    price: '',
    duration: '',
    terms: [''],
    benefits: [''],
  });
  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUploadAndSubmit = async () => {
    try {
      setLoading(true);

      // 1. Upload cover image
      const coverForm = new FormData();
      coverForm.append('image', imageFile);
      const coverRes = await axios.post('http://localhost:4000/api/v1/uploading/upload-image', coverForm);
      const imageId = coverRes.data.image.public_id;

      // 2. Upload gallery images
      const galleryForm = new FormData();
      galleryFiles.forEach(file => galleryForm.append('images', file));
      const galleryRes = await axios.post('http://localhost:4000/api/v1/uploading/upload-gallery', galleryForm);
      const galleryIds = galleryRes.data.images.map(img => img.public_id);

      // 3. Submit service
      const payload = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        imageId,
        galleryIds,
        terms: formData.terms.filter(Boolean),
        benefits: formData.benefits.filter(Boolean),
      };

      const serviceRes = await axios.post('http://localhost:4000/api/v1/service', payload);
      alert('✅ Service created: ' + serviceRes.data.data.name);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="shortDesc" placeholder="Short Desc" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="desc" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} className="border p-2 w-full" />
      <input name="duration" type="number" placeholder="Duration" onChange={handleChange} className="border p-2 w-full" />

      <label>Upload Cover Image</label>
      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />

      <label>Upload Gallery</label>
      <input type="file" accept="image/*" multiple onChange={e => setGalleryFiles([...e.target.files])} />

      <button 
        onClick={handleUploadAndSubmit} 
        className="bg-blue-500 text-black px-4 py-2 rounded" 
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Service'}
      </button>
    </div>
  );
};

export default CreateServiceForm;
