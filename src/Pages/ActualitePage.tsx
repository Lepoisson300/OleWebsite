import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

type NewsItem = {
  name: string;
  url: string;
  description: string;
  date: string;
};

const ActualitesPage = () => {
  const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
  const API_KEY = import.meta.env.VITE_API_KEY as string;
  const RANGE = import.meta.env.VITE_RANGE_ACTUALITES as string;

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          const items = data.values
            .slice(1)
            .map((row: string[]) => ({
              name: row[0]?.trim(),
              url: row[1]?.trim(),
              description: row[2]?.trim(),
              date: row[3]?.trim(),
            }))
            .filter((item: NewsItem) => item.name);
          setNewsItems(items);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      {/* Découpe diagonale en bas sur mobile, et à gauche/droite sur ordinateur */}
      <style>{`
        .clip-diagonal-left {
          clip-path: polygon(0 55%, 100% 45%, 100% 100%, 0% 100%);
        }
        .clip-diagonal-right {
          clip-path: polygon(0 45%, 100% 55%, 100% 100%, 0% 100%);
        }
        @media (min-width: 768px) {
          .clip-diagonal-left {
            clip-path: polygon(0 0, 52% 0, 30% 100%, 0% 100%);
          }
          .clip-diagonal-right {
            clip-path: polygon(25% 0, 100% 0, 100% 100%, 40% 100%);
          }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-500">Actualités</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Restez informé de toutes les nouveautés d&apos;Olé Restaurant : nouveaux plats, événements spéciaux, et actualités
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {newsItems.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={index}
                className="relative min-h-[410px] md:min-h-[300px] rounded-xl overflow-hidden shadow-2xl border border-stone-800/80 group flex flex-col justify-end md:flex-row md:items-center bg-neutral-950"
              >
                {/* 1. Image de fond bien visible en haut sur mobile et sur le côté sur desktop */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-top md:object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Léger voile uniquement sur le haut pour faire ressortir les pilules */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none" />

                {/* 2. Panneau noir diagonal (en bas sur mobile, alterné gauche/droite sur desktop) */}
                <div
                  className={`absolute inset-0 bg-neutral-950/95 pointer-events-none transition-all duration-500 ${isReversed ? 'clip-diagonal-right' : 'clip-diagonal-left'
                    }`}
                />

                {/* 3. Pilules superposées sur la partie photo */}
                <div
                  className={`absolute top-4 sm:top-5 z-20 flex flex-col gap-2 ${isReversed
                    ? 'left-4 sm:left-5 items-start'
                    : 'right-4 sm:right-5 items-end'
                    }`}
                >
                  {item.date && (
                    <span className="inline-flex items-center gap-1.5 bg-neutral-950/90 backdrop-blur-sm text-white px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg border border-white/10">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      {item.date}
                    </span>
                  )}
                  <span className="inline-block bg-white text-neutral-950 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg tracking-wide">
                    O&apos;lé Restaurant
                  </span>
                </div>

                {/* 4. Contenu texte positionné dans la zone sombre */}
                <div
                  className={`relative z-10 w-full md:w-[54%] px-6 pb-6 pt-40 md:p-8 flex flex-col justify-center ${isReversed
                    ? 'md:ml-auto md:items-end md:text-right'
                    : 'md:mr-auto md:items-start md:text-left'
                    }`}
                >


                  {/* Titre principal */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActualitesPage;