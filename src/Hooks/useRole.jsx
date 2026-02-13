import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxios from './useAxios';

const useRole = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user.email}/role`);
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;