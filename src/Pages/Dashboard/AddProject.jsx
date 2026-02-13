import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const AddProject = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      shortDescription: '',
      liveUrl: '',
      category: '',
      clientLocation: '',
      completionDate: '',
      image: '',
      featured: false
    }
  });

  // Add technology tag
  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTech = techInput.trim();
      if (newTech && !technologies.includes(newTech)) {
        setTechnologies([...technologies, newTech]);
        setTechInput('');
      }
    }
  };

  // Remove technology tag
  const removeTechnology = (techToRemove) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
  };

  // Form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Validate technologies
      if (technologies.length === 0) {
        toast.error('Please add at least one technology');
        setLoading(false);
        return;
      }

      // Create project object
      const projectData = {
        ...data,
        technologies: technologies,
        createdAt: new Date().toISOString(),
        status: 'pending',
        updatedAt: new Date().toISOString()
      };

      // Send to database
      const response = await axiosInstance.post('/projects', projectData);
      
      if (response.data) {
        toast.success('Project created successfully!');
        
        // Reset form
        reset();
        setTechnologies([]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  // Categories
  const categories = [
    'Blockchain & Web3',
    'Finance & Trading',
    'E-commerce',
    'Healthcare',
    'Education',
    'Mobile App',
    'Entertainment',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Project</h1>
        <p className="text-gray-600 mt-1">Fill in the project details below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Basic Info */}
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter project title"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register('category', { required: 'Category is required' })}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Brief overview"
                {...register('shortDescription', { required: 'Short description is required' })}
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="3"
                className="textarea textarea-bordered w-full"
                placeholder="Detailed description"
                {...register('description', { required: 'Description is required' })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-lg font-semibold mb-4">Project Details</h2>
          
          <div className="space-y-4">
            {/* Live URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Live URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com"
                {...register('liveUrl', { required: 'Live URL is required' })}
              />
              {errors.liveUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.liveUrl.message}</p>
              )}
            </div>

            {/* Client Location */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Client Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., Global, USA, China"
                {...register('clientLocation', { required: 'Client location is required' })}
              />
              {errors.clientLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.clientLocation.message}</p>
              )}
            </div>

            {/* Completion Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Completion Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register('completionDate', { required: 'Completion date is required' })}
              />
              {errors.completionDate && (
                <p className="text-red-500 text-sm mt-1">{errors.completionDate.message}</p>
              )}
            </div>

            {/* Image URL - Simple text input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
                {...register('image')}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter direct link to project image (optional)
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-lg font-semibold mb-2">
            Technologies <span className="text-red-500">*</span>
          </h2>
          
          <div>
            <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg min-h-[48px]">
              {technologies.map((tech, index) => (
                <span key={index} className="badge badge-primary gap-1 py-3">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-1 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className="flex-1 outline-none bg-transparent min-w-[120px] px-2 py-1"
                placeholder={technologies.length === 0 ? "Add tech (Enter to add)" : ""}
              />
            </div>
            {technologies.length === 0 && (
              <p className="text-red-500 text-sm mt-1">At least one technology is required and press Enter</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Press Enter or comma to add technology
            </p>
          </div>
        </div>

        {/* Auto-generated Info */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Created: {new Date().toLocaleDateString()}</span>
            <span className="badge badge-warning">Status: Pending</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/projects')}
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
                Creating...
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;