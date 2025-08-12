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

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          const items = data.values.slice(1).map((row: string[]) => ({
            name: row[0]?.trim(),
            url: row[1]?.trim(), // remove extra whitespace / \r
          }));
          setGalleryImages(items);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-500">Galerie</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Découvrez l'ambiance chaleureuse de notre restaurant et la beauté de notre cuisine authentique
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold">{image.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriePage;
