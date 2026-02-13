import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaPlus, FaSpinner, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const AddTestimonial = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      position: '',
      company: '',
      country: '',
      text: '',
      image: '',
      featured: false
    }
  });

  // Form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Validate testimonial text
      if (!data.text || data.text.length < 10) {
        toast.error('Testimonial text must be at least 10 characters');
        setLoading(false);
        return;
      }

      // Create testimonial object
      const testimonialData = {
        ...data,
        rating: rating,
        createdAt: new Date().toISOString(),
        status: 'pending',
        updatedAt: new Date().toISOString()
      };

      // Send to database
      const response = await axiosInstance.post('/testimonials', testimonialData);
      
      if (response.data) {
        toast.success('Testimonial submitted successfully! Pending approval.');
        
        // Reset form
        reset();
        setRating(5);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Testimonial</h1>
        <p className="text-gray-600 mt-1">Share your experience working with us</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Basic Info */}
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-lg font-semibold mb-4">Client Information</h2>
          
          <div className="space-y-4">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., John Doe"
                {...register('name', { required: 'Client name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Position & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="e.g., CEO, CTO, Director"
                  {...register('position', { required: 'Position is required' })}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="e.g., Tech Corp"
                  {...register('company', { required: 'Company is required' })}
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., USA, Canada, China"
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>

            {/* Client Image URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Client Image URL
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
                {...register('image')}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter direct link to client photo (optional)
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-lg font-semibold mb-4">Testimonial Details</h2>
          
          <div className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating} out of 5 stars
                </span>
              </div>
            </div>

            {/* Testimonial Text */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                className="textarea textarea-bordered w-full"
                placeholder="Share your experience working with us..."
                {...register('text', { 
                  required: 'Testimonial text is required',
                  minLength: { value: 10, message: 'Testimonial must be at least 10 characters' }
                })}
              ></textarea>
              {errors.text && (
                <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Auto-generated Info */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Submitted: {new Date().toLocaleDateString()}</span>
            <span className="badge badge-warning">Status: Pending Approval</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/testimonials')}
            className="btn btn-outline"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Submit Testimonial
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonial;