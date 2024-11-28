import { useState } from 'react';
import { Button } from './ui/Button';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
}

export function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      // Convert the file to a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageUploaded(base64String);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling image:', error);
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          disabled={uploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Processando...' : 'Escolher Imagem'}
        </Button>
      </label>
    </div>
  );
}