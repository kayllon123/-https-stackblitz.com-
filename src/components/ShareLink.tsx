import { useState } from 'react';
import { Button } from './ui/Button';
import { Link, Copy, Check } from 'lucide-react';

export function ShareLink() {
  const [copied, setCopied] = useState(false);
  const menuUrl = window.location.origin;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Link className="h-4 w-4 text-orange-500 flex-shrink-0" />
        <span className="text-gray-300 truncate">{menuUrl}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        className="flex-shrink-0"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copiar Link
          </>
        )}
      </Button>
    </div>
  );
}