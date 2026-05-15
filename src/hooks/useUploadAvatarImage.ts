import { useMutation } from '@tanstack/react-query';

export function useUploadAvatarImage() {
 return useMutation({
  mutationFn: async (file: File) => {
   const formData = new FormData();
   formData.append('file', file);
   const token = localStorage.getItem('fusateen_access_token');

   const response = await fetch('/api/uploads/product-image?category=avatars', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
   });

   if (!response.ok) {
    throw new Error('Failed to upload avatar image');
   }

   const data = await response.json();
   return data.url as string;
  },
 });
}