import { Clock, MapPin, Phone, Mail} from 'lucide-react';
import type { Horaire } from '../types/horaires';
import { useState } from 'react';
interface ContactPageProps {
  listesHoraires: Horaire[];
}

// Contact Page Component
const ContactPage = ({ listesHoraires }: ContactPageProps) => {
  const [showAlert, setShowAlert] =  useState(true);
  
  return(
  <section className="py-16 bg-neutral-900 min-h-screen">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-amber-500">Contact</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Contactez-nous pour réserver une table ou pour toute information sur notre restaurant
        </p>
      </div>
      {showAlert && (
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center p-4 text-amber-100 rounded-lg bg-amber-900/50 border border-amber-700" role="alert">
        <svg className="w-5 h-5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <div className="ms-3 text-sm font-medium">
          Nous avons des soucis d'emails. Veuillez nous contacter à cette adresse email. <a href="mailto:jeanpysniak@hotmail.co.uk" className="font-semibold underline hover:no-underline">jeanpysniak@hotmail.co.uk</a>.
        </div>
        <button 
          type="button" 
          onClick={() => setShowAlert(false)}
          className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-amber-500 p-1.5 hover:bg-amber-800 inline-flex items-center justify-center h-8 w-8" 
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
        </button>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-stone-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-stone-100">Informations</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-100">Adresse</h4>
                  <p className="text-stone-300">Chemin de saint joux 22<br />2520 La Neuveville, Suisse </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-100">Téléphone</h4>
                  <p className="text-stone-300">+41 32 751 66 55</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-100">Email</h4>
                  <a href="mailto:jeanpysniak@hotmail.co.uk" className="font-semibold text-stone-300 hover:no-underline">jeanpysniak@hotmail.co.uk</a>
                </div>                
              </div>
                <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-100">Horaires</h4>
                  <div className="text-stone-300 space-y-1">
                  {listesHoraires && listesHoraires.length > 0 ? (
                    listesHoraires.map((horaire, idx) => (
                    <p key={idx}>
                      {horaire.jours}: {horaire.ouverture} - {horaire.fermeture}
                    </p>
                    ))
                  ) : (
                    <p>Horaires non disponibles</p>
                  )}
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-stone-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-6 text-stone-100">Réservation</h3>
          <a
            href="mailto:info@restaurantole.com"
            className="bg-amber-800 text-white py-3 px-8 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-lg"
          >
            Envoyer une demande de réservation
          </a>
        </div>
      </div>
    </div>
  </section>
  )
};

export default ContactPage;

