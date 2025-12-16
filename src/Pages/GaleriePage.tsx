import { Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type PhotoItem = {
  name: string;
  url: string;
};

const GaleriePage = () => {
  const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
  const API_KEY = import.meta.env.VITE_API_KEY as string;
  const RANGE = import.meta.env.VITE_RANGE_PHOTOS as string;

  const [galleryImages, setGalleryImages] = useState<PhotoItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          const items = data.values.slice(1).map((row: string[]) => ({
            name: row[0]?.trim(),
            url: row[1]?.trim(),
          }));
          setGalleryImages(items);
        }
      })
      .catch(console.error);
  }, []);

   const totalPages = Math.ceil(galleryImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = galleryImages.slice(startIndex, startIndex + itemsPerPage);


  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-500">Galerie</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Découvrez l'ambiance chaleureuse de notre restaurant et la beauté de notre cuisine authentique
          </p>
        </div>
        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {currentImages.map((image, index) => {
            // Create varied heights for masonry effect
            const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80', 'h-72', 'h-96', 'h-80'];
            const heightClass = heights[index % heights.length];
            
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-lg ${heightClass} ${
                  index === 1 ? 'md:row-span-2 md:h-auto' : ''
                }`}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <ImageIcon className="h-6 w-6 mb-2" />
                    <h3 className="font-semibold text-lg">{image.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GaleriePage;
