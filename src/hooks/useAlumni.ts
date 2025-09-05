import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alumniService } from '../services/alumniService';
import { Alumni } from '../types';

export const useAlumni = () => {
  return useQuery({
    queryKey: ['alumni'],
    queryFn: alumniService.getAll,
  });
};

export const useAlumniById = (id: number) => {
  return useQuery({
    queryKey: ['alumni', id],
    queryFn: () => alumniService.getById(id),
    enabled: !!id,
  });
};

export const useCreateAlumni = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: alumniService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumni'] });
    },
  });
};

export const useUpdateAlumni = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Alumni> }) =>
      alumniService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumni'] });
    },
  });
};

export const useDeleteAlumni = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: alumniService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumni'] });
    },
  });
};