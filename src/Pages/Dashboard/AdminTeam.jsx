import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import { FaCheck, FaTimes, FaEye, FaTrash, FaEdit, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { format } from 'date-fns';

const AdminTeam = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchTeamMembers();
    }, [filter]);

    const fetchTeamMembers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/teams?status=${filter}`);
            setTeamMembers(response.data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch team members');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axiosInstance.patch(`/teams/${id}/status`, { status });
            if (response.data.success) {
                toast.success(`Team member ${status} successfully`);
                fetchTeamMembers();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                const response = await axiosInstance.delete(`/teams/${id}`);
                if (response.data.success) {
                    toast.success('Team member deleted successfully');
                    fetchTeamMembers();
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to delete team member');
            }
        }
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
                <h1 className="text-2xl font-bold">Manage Team Members</h1>
                <button
                    onClick={() => window.location.href = '/dashboard/add-team'}
                    className="btn btn-primary"
                >
                    Add New Member
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

            {/* Team Members Grid */}
            {teamMembers.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No team members found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                        <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow">
                            {/* Header with Status */}
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b flex justify-between items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        member.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {member.status}
                                </span>
                                {member.featured && (
                                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Profile Image/Initials */}
                            <div className="flex justify-center mt-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#1651A9] to-purple-600 flex items-center justify-center text-white">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.parentNode.innerHTML = getInitials(member.name);
                                            }}
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold">
                                            {getInitials(member.name)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-[#1651A9] font-semibold text-sm mb-2">
                                    {member.position}
                                </p>
                                <p className="text-gray-600 text-sm mb-1">
                                    {member.role}
                                </p>
                                {member.additionalRole && (
                                    <p className="text-gray-700 font-medium text-sm mb-1">
                                        {member.additionalRole}
                                    </p>
                                )}
                                <p className="text-gray-500 text-sm mb-3">
                                    {member.company || 'creative hub it agency'}
                                </p>

                                {/* Display Order */}
                                {member.order && (
                                    <p className="text-xs text-gray-400 mb-3">
                                        Order: {member.order}
                                    </p>
                                )}

                                {/* Social Links */}
                                <div className="flex justify-center gap-3 mb-4">
                                    {member.socialLinks?.facebook && (
                                        <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                            <FaFacebook />
                                        </a>
                                    )}
                                    {member.socialLinks?.twitter && (
                                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                            <FaTwitter />
                                        </a>
                                    )}
                                    {member.socialLinks?.linkedin && (
                                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                                            <FaLinkedin />
                                        </a>
                                    )}
                                    {member.socialLinks?.instagram && (
                                        <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                                            <FaInstagram />
                                        </a>
                                    )}
                                </div>

                                {/* Date */}
                                <p className="text-xs text-gray-400 mb-4">
                                    Added: {format(new Date(member.createdAt), 'MMM dd, yyyy')}
                                </p>

                                {/* Actions */}
                                <div className="flex justify-center gap-2 pt-4 border-t">
                                    <button
                                        onClick={() => window.open(`/team/${member._id}`, '_blank')}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="View"
                                    >
                                        <FaEye />
                                    </button>

                                    {member.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(member._id, 'approved')}
                                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(member._id, 'rejected')}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => window.location.href = `/dashboard/admin/teams/edit/${member._id}`}
                                        className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(member._id)}
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

export default AdminTeam;