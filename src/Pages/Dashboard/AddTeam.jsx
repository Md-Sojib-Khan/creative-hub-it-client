import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaPlus, FaSpinner, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const AddTeam = () => {
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            position: '',
            role: '',
            company: 'creative hub it agency',
            additionalRole: '',
            image: '',
            featured: false,
            order: 0
        }
    });

    // Handle social link changes
    const handleSocialChange = (platform, value) => {
        setSocialLinks({
            ...socialLinks,
            [platform]: value
        });
    };

    // Form submit
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Create team member object
            const teamData = {
                ...data,
                socialLinks: socialLinks,
                createdAt: new Date().toISOString(),
                status: 'pending',
                updatedAt: new Date().toISOString()
            };

            // Send to database
            const response = await axiosInstance.post('/teams', teamData);

            if (response.data) {
                toast.success('Team member added successfully! Pending approval.');

                // Reset form
                reset();
                setSocialLinks({
                    facebook: '',
                    twitter: '',
                    linkedin: '',
                    instagram: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add team member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Add New Team Member</h1>
                <p className="text-gray-600 mt-1">Add a new team member to your organization</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Basic Info */}
                <div className="bg-white rounded-lg p-6 border">
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="e.g., Md Shakil Mirza"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Position & Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Position <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="e.g., Full Stack Web Developer"
                                    {...register('position', { required: 'Position is required' })}
                                />
                                {errors.position && (
                                    <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="e.g., Cyber Security Expert"
                                    {...register('role', { required: 'Role is required' })}
                                />
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Additional Role & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Additional Role
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="e.g., CEO, Team Lead"
                                    {...register('additionalRole')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="creative hub it agency"
                                    {...register('company')}
                                />
                            </div>
                        </div>

                        {/* Profile Image URL */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Profile Image URL
                            </label>
                            <input
                                type="url"
                                className="input input-bordered w-full"
                                placeholder="https://example.com/image.jpg"
                                {...register('image')}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Enter direct link to team member photo
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-lg p-6 border">
                    <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>

                    <div className="space-y-4">
                        {/* Facebook */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <FaFacebook className="w-5 h-5" />
                            </div>
                            <input
                                type="url"
                                className="input input-bordered flex-1"
                                placeholder="Facebook profile URL"
                                value={socialLinks.facebook}
                                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                            />
                        </div>

                        {/* Twitter */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white">
                                <FaTwitter className="w-5 h-5" />
                            </div>
                            <input
                                type="url"
                                className="input input-bordered flex-1"
                                placeholder="Twitter profile URL"
                                value={socialLinks.twitter}
                                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                                <FaLinkedin className="w-5 h-5" />
                            </div>
                            <input
                                type="url"
                                className="input input-bordered flex-1"
                                placeholder="LinkedIn profile URL"
                                value={socialLinks.linkedin}
                                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                            />
                        </div>

                        {/* Instagram */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white">
                                <FaInstagram className="w-5 h-5" />
                            </div>
                            <input
                                type="url"
                                className="input input-bordered flex-1"
                                placeholder="Instagram profile URL"
                                value={socialLinks.instagram}
                                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Auto-generated Info */}
                <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">Added: {new Date().toLocaleDateString()}</span>
                        <span className="badge badge-warning">Status: Pending Approval</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/admin/teams')}
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
                                Adding...
                            </>
                        ) : (
                            <>
                                <FaPlus className="mr-2" />
                                Add Team Member
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTeam;