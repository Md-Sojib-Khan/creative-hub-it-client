import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import { FaCheck, FaTimes, FaEye, FaStar, FaTrash, FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchTestimonials();
    }, [filter]);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/testimonials?status=${filter}`);
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axiosInstance.patch(`/testimonials/${id}/status`, { status });
            if (response.data.success) {
                toast.success(`Testimonial ${status} successfully`);
                fetchTestimonials();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update testimonial status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await axiosInstance.delete(`/testimonials/${id}`);
                if (response.data.success) {
                    toast.success('Testimonial deleted successfully');
                    fetchTestimonials();
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to delete testimonial');
            }
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={`w-3 h-3 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
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
                <h1 className="text-2xl font-bold">Manage Testimonials</h1>
                <button
                    onClick={() => window.location.href = '/dashboard/add-testimonials'}
                    className="btn btn-primary"
                >
                    Add New Testimonial
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['pending', 'approved', 'rejected', 'all'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${filter === status
                            ? 'bg-[#1651A9] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Testimonials Grid */}
            {testimonials.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No testimonials found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                {/* Header with Status */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${testimonial.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            testimonial.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {testimonial.status}
                                    </span>
                                    {testimonial.featured && (
                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Client Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#1651A9] text-white text-xl font-bold">
                                                {testimonial.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                    {renderStars(testimonial.rating || 5)}
                                    <span className="text-xs text-gray-500 ml-2">
                                        {testimonial.rating || 5}/5
                                    </span>
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-700 text-sm italic mb-4 line-clamp-3">
                                    "{testimonial.text}"
                                </p>

                                {/* Country & Date */}
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                                    <span>📍 {testimonial.country || 'Not specified'}</span>
                                    <span>📅 {format(new Date(testimonial.createdAt), 'MMM dd, yyyy')}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t">
                                    <button
                                        onClick={() => window.open(`/testimonials/${testimonial._id}`, '_blank')}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="View"
                                    >
                                        <FaEye />
                                    </button>

                                    {testimonial.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(testimonial._id, 'approved')}
                                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(testimonial._id, 'rejected')}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => window.location.href = `/dashboard/admin/testimonials/edit/${testimonial._id}`}
                                        className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(testimonial._id)}
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors ml-auto"
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

export default AdminTestimonials;