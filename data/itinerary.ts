import { ItineraryDay, Restaurant, Monument } from '../types';

export const itineraryData: ItineraryDay[] = [
  {
      id: 1, date: "Sáb 9", title: "Benvenuti a Roma", loc: "Roma",
      color: "roma-red",
      summary: "Llegada, check-in y primera toma de contacto gratis.",
      morning: "Llegada 13:00. Tren regional o Bus Terravision (6€) a Termini. Check-in.",
      afternoon: "Ruta del Agua (Gratis): Plaza de España -> Fontana di Trevi -> Panteón (Entrada 5€, reservar web).",
      evening: "Piazza Navona y cena en zona Campo de' Fiori.",
      options: "Si no entras al Panteón, visítalo por fuera y entra en San Luigi dei Francesi (Gratis) para ver Caravaggios.",
      img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop"
  },
  {
      id: 2, date: "Dom 10", title: "Roma Imperial", loc: "Roma",
      color: "roma-red",
      summary: "El corazón de la historia. Mucho caminar.",
      morning: "08:30 Coliseo, Foro y Palatino (Ticket 18€). Lleva agua y gorra.",
      afternoon: "Bajar por Via dei Fori Imperiali. Ver Mercado de Trajano (fuera). Altar de la Patria (Vistas gratis desde nivel medio).",
      evening: "Barrio Monti (Hipster/Vintage) para cenar o tomar algo en las escaleras de la plaza.",
      options: "Visita San Pietro in Vincoli (Gratis) para ver el Moisés de Miguel Ángel.",
      img: "https://images.unsplash.com/photo-1515542622106-78bda8ba30c3?q=80&w=1200&auto=format&fit=crop"
  },
  {
      id: 3, date: "Lun 11", title: "Vaticano & Trastevere", loc: "Roma",
      color: "roma-red",
      summary: "El estado más pequeño y el barrio más bohemio.",
      morning: "Museos Vaticanos + Sixtina (20€, reservar 2 meses antes). Basílica San Pedro (Gratis, cola).",
      afternoon: "Castel Sant'Angelo (foto puente). Caminar junto al Tíber hasta Trastevere.",
      evening: "Perderse por Trastevere. Subir al Janículo (Gianicolo) si hay fuerzas para ver atardecer.",
      options: "Opcional: Cúpula San Pedro (8€ sin ascensor) para la vista icónica.",
      img: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=1200&auto=format&fit=crop"
  },
  {
      id: 4, date: "Mar 12", title: "Rumbo a Toscana", loc: "Florencia",
      color: "gray-500",
      summary: "Tren y coche. Inicio de la ruta toscana.",
      morning: "Tren Roma Termini -> Firenze SMN. (Regional Veloce: 22€, 3h 40m). Comer panini en el tren.",
      afternoon: "Recoger coche alquiler (Via Sansovino o Aeropuerto). Check-in en agroturismo/apartamento.",
      evening: "Cena tranquila con productos del súper local (vino, queso, embutido).",
      options: "Alojamiento estratégico: Zona Montespertoli o San Casciano para estar cerca de Florencia y Chianti.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS241KO6vy0oBKF6f4Yhd5PhX2C7NqCkQtCJA&s"
  },
  {
      id: 5, date: "Mié 13", title: "Florencia (Sin Coche)", loc: "Florencia",
      color: "toscana-green",
      summary: "Deja el coche aparcado. Día intenso de arte.",
      morning: "Aparcar en Villa Costanza (Tranvía T1 al centro). Piazza Duomo. Galería Uffizi (25€).",
      afternoon: "Ponte Vecchio. Palazzo Pitti (por fuera). Jardines de Boboli (o Bardini).",
      evening: "Atardecer OBLIGATORIO en Piazzale Michelangelo (Gratis, subida a pie). Vistas brutales.",
      options: "Low Cost Food: All'Antico Vinaio (5-7€ bocadillo gigante).",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS241KO6vy0oBKF6f4Yhd5PhX2C7NqCkQtCJA&s"
  },
  {
      id: 6, date: "Jue 14", title: "Pisa & Lucca", loc: "Toscana",
      color: "toscana-green",
      summary: "Torres inclinadas y murallas ciclables.",
      morning: "Pisa: Plaza de los Milagros. Torre (20€ subir, gratis ver). Parking: Parcheggio Via Pietrasantina (barato/gratis + bus).",
      afternoon: "Lucca: Pasear por las murallas (o alquilar bici 3€/h). Plaza del Anfiteatro.",
      evening: "Vuelta a base. Cena en ruta.",
      options: "Parada rápida en Pistoia si sobra tiempo.",
      img: "https://www.italia.it/content/dam/tdh/es/interests/toscana/pisa/pisa/media/20210310164211-pisa.jpg"
  },
  {
      id: 7, date: "Vie 15", title: "Val d'Orcia Natural", loc: "Toscana",
      color: "toscana-green",
      summary: "La Toscana de postal. Cipreses y termas.",
      morning: "Ruta SR2 (Cassia). Siena (Parking Fortezza). Piazza del Campo. Seguir hacia el sur.",
      afternoon: "Mirador Cipreses (San Quirico). Pienza (Pueblo ideal). Bagno Vignoni (Plaza de agua).",
      evening: "Opción Termas GRATIS: Bagni San Filippo (Fosso Bianco). Agua caliente natural en el bosque.",
      options: "Ruta del Vino: Parar en Montalcino solo para ver la fortaleza.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWg7NQRt0iO9v5PVvFnDZvvu1j_YYYKPDLtw&s"
  },
  {
      id: 8, date: "Sáb 16", title: "San Gimignano", loc: "Toscana",
      color: "toscana-green",
      summary: "Manhattan Medieval y última tarde.",
      morning: "San Gimignano. Llegar pronto (9:00) para parking P3 o P4. Ver las torres.",
      afternoon: "Monteriggioni (Pueblo amurallado diminuto, se ve en 30 min). Chianti: Ruta SR222 (Chiantigiana).",
      evening: "Devolución de coche si el vuelo es muy temprano al día siguiente, o relax.",
      options: "Helado en Dondoli (San Gimignano) - Dicen que es el mejor del mundo.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWg7NQRt0iO9v5PVvFnDZvvu1j_YYYKPDLtw&s"
  },
  {
      id: 9, date: "Dom 17", title: "Regreso", loc: "Regreso",
      color: "dark",
      summary: "Vuelo de vuelta a casa.",
      morning: "Aeropuerto Florencia (Peretola). Vuelo 10:00. Arrivederci!",
      afternoon: "",
      evening: "",
      options: "",
      img: "https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b?q=80&w=1200&auto=format&fit=crop"
  }
];

export const restaurantsData: Restaurant[] = [
  { name: "Da Enzo al 29", city: "Roma", area: "Trastevere", price: 2, rating: 4.8, type: "Trattoria", desc: "El Carbonara definitivo. No reservan, ve 20 min antes de abrir." },
  { name: "Bonci Pizzarium", city: "Roma", area: "Vaticano", price: 2, rating: 4.7, type: "Pizza", desc: "Pizza al corte gourmet. Cerca Museos Vaticanos." },
  { name: "Forno Campo de' Fiori", city: "Roma", area: "Centro", price: 1, rating: 4.6, type: "Panadería", desc: "Pizza bianca para llevar. Barato y delicioso." },
  { name: "Tonnarello", city: "Roma", area: "Trastevere", price: 2, rating: 4.5, type: "Pasta", desc: "Turístico pero muy bueno. Raciones enormes servidas en sartén." },
  { name: "Pastificio Guerra", city: "Roma", area: "Pza España", price: 1, rating: 4.4, type: "Pasta", desc: "4€ el plato de pasta para llevar. El mejor low cost." },
  { name: "All'Antico Vinaio", city: "Toscana", area: "Florencia", price: 1, rating: 4.9, type: "Street Food", desc: "La Schiacciata más famosa. Fila rápida." },
  { name: "Trattoria Mario", city: "Toscana", area: "Florencia", price: 2, rating: 4.7, type: "Trattoria", desc: "Solo comidas. Bistecca alla Fiorentina auténtica." },
  { name: "Mercato Centrale", city: "Toscana", area: "Florencia", price: 2, rating: 4.6, type: "Mercado", desc: "Puestos variados (Trufa, Pasta, Burger). Planta alta." },
  { name: "Gelateria Dondoli", city: "Toscana", area: "San Gimignano", price: 1, rating: 4.8, type: "Helado", desc: "Campeón del mundo. Sabor azafrán y piñones." },
  { name: "Osteria Acquacheta", city: "Toscana", area: "Montepulciano", price: 2, rating: 4.7, type: "Carne", desc: "Famosa por la carne. Ambiente rústico total." }
];

export const monumentsData: Monument[] = [
  { name: "Coliseo/Foro/Palatino", price: 18, link: "https://ticketing.colosseo.it/en/" },
  { name: "Museos Vaticanos", price: 20, link: "https://m.museivaticani.va/" },
  { name: "Panteón", price: 5, link: "https://www.pantheonroma.com/" },
  { name: "Uffizi (Florencia)", price: 25, link: "https://www.uffizi.it/en/tickets" },
  { name: "Torre de Pisa", price: 20, link: "https://www.opapisa.it/en/" }
];