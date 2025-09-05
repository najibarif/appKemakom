import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { angkatanService } from '../services/angkatanService';
import { Angkatan } from '../types';

export const useAngkatan = () => {
  return useQuery({
    queryKey: ['angkatan'],
    queryFn: angkatanService.getAll,
  });
};

export const useAngkatanById = (id: number) => {
  return useQuery({
    queryKey: ['angkatan', id],
    queryFn: () => angkatanService.getById(id),
    enabled: !!id,
  });
};

export const useCreateAngkatan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: angkatanService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['angkatan'] });
    },
  });
};

export const useUpdateAngkatan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Angkatan> }) =>
      angkatanService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['angkatan'] });
    },
  });
};

export const useDeleteAngkatan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: angkatanService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['angkatan'] });
    },
  });
};