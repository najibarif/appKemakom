import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsService } from '../services/newsService';
import { News } from '../types';

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: newsService.getAll,
  });
};

export const useNewsById = (id: number) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => newsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<News> }) =>
      newsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};