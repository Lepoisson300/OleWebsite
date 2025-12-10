import { Clock, MapPin, Phone, Mail} from 'lucide-react';
import type { Horaire } from '../types/horaires';
import { useState } from 'react';
import Alerts from '../components/Alerts';
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
      <Alerts></Alerts>
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

