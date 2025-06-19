'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface GifPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const GifPicker: React.FC<GifPickerProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API!;

  const handleSearch = async () => {
    if (!search.trim()) return;

  const res = await fetch(
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${search}&limit=50`
);

    const data = await res.json();
    setResults(data.data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-4 rounded-lg w-[90%] max-w-lg">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search GIFs"
            className="w-full border px-2 py-1 rounded"
          />
          <div className="grid grid-cols-3 gap-2 mt-4 max-h-80 overflow-y-auto">
            {results.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt="gif"
                className="cursor-pointer rounded hover:scale-105 transition"
                onClick={() => {
                  onSelect(gif.images.original.url);
                  onClose(); // Close after select
                }}
              />
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default GifPicker;
