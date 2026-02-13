import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import { FaCheck, FaTimes, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchProjects();
    }, [filter]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/projects?status=${filter}`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axiosInstance.patch(`/projects/${id}/status`, { status });
            if (response.data.success) {
                toast.success(`Project ${status} successfully`);
                fetchProjects();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update project status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await axiosInstance.delete(`/projects/${id}`);
                if (response.data.success) {
                    toast.success('Project deleted successfully');
                    fetchProjects();
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to delete project');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1651A9]"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Projects</h1>
                <button
                    onClick={() => window.location.href = '/dashboard/add-projects'}
                    className="btn btn-primary"
                >
                    Add New Project
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['pending', 'approved', 'rejected', 'all'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${
                            filter === status
                                ? 'bg-[#1651A9] text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            {projects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No projects found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow">
                            {/* Header with Status */}
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b flex justify-between items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    project.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    project.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {project.status}
                                </span>
                                {project.featured && (
                                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Project Image */}
                            <div className="flex justify-center mt-6">
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-[#1651A9] to-purple-600 flex items-center justify-center text-white">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/96?text=No+Image';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold">
                                            {project.title?.charAt(0) || 'P'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                                    {project.title}
                                </h3>
                                
                                <p className="text-gray-600 text-sm mb-3 text-center line-clamp-2">
                                    {project.shortDescription || project.description?.substring(0, 100)}
                                </p>

                                {/* Category & Location */}
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                    <span className="bg-gray-100 px-2 py-1 rounded">
                                        {project.category || 'Uncategorized'}
                                    </span>
                                    <span>
                                        {project.clientLocation || 'N/A'}
                                    </span>
                                </div>

                                {/* Technologies */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Date */}
                                <p className="text-xs text-gray-400 mb-4 text-center">
                                    Added: {project.createdAt ? format(new Date(project.createdAt), 'MMM dd, yyyy') : 'N/A'}
                                </p>

                                {/* Actions */}
                                <div className="flex justify-center gap-2 pt-4 border-t">
                                    <button
                                        onClick={() => window.open(`/projects/${project._id}`, '_blank')}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="View"
                                    >
                                        <FaEye />
                                    </button>

                                    {project.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(project._id, 'approved')}
                                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(project._id, 'rejected')}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => window.location.href = `/dashboard/edit-project/${project._id}`}
                                        className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProjects;