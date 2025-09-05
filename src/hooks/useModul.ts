import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { modulService } from '../services/modulService';
import { Modul } from '../types';

export const useModul = () => {
  return useQuery({
    queryKey: ['moduls'],
    queryFn: modulService.getAll,
  });
};

export const useModulById = (id: number) => {
  return useQuery({
    queryKey: ['moduls', id],
    queryFn: () => modulService.getById(id),
    enabled: !!id,
  });
};

export const useCreateModul = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: modulService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduls'] });
    },
  });
};

export const useUpdateModul = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Modul> }) =>
      modulService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduls'] });
    },
  });
};

export const useDeleteModul = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: modulService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduls'] });
    },
  });
};