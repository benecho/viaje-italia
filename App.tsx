import React, { useState, useEffect, useRef } from 'react';
import { itineraryData, restaurantsData, monumentsData } from './data/itinerary';
import { TabType, ItineraryDay } from './types';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ExternalLink } from 'lucide-react';

// Declare global types for CDN libraries
declare global {
  interface Window {
    Chart: any;
    Plotly: any;
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('itinerario');
  const [selectedDay, setSelectedDay] = useState<ItineraryDay>(itineraryData[0]);
  const [restFilter, setRestFilter] = useState<'all' | 'Roma' | 'Toscana'>('all');
  
  const budgetChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- Handlers for Day Navigation ---
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const changeDay = (direction: 'prev' | 'next') => {
    const currentIndex = itineraryData.findIndex(d => d.id === selectedDay.id);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedDay(itineraryData[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < itineraryData.length - 1) {
      setSelectedDay(itineraryData[currentIndex + 1]);
    }
  };

  // --- Effects for Charts ---

  useEffect(() => {
    // Only init charts when the relevant tab is active
    if (activeTab === 'presupuesto' && budgetChartRef.current && window.Chart) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = budgetChartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new window.Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Vuelos', 'Alojamiento', 'Transporte', 'Entradas'],
            datasets: [{
              data: [250, 250, 60, 108],
              backgroundColor: ['#1F2937', '#EA580C', '#10B981', '#3B82F6'],
              borderWidth: 0,
              hoverOffset: 20
            }]
          },
          options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            cutout: '65%', 
            plugins: { 
              legend: { 
                position: 'bottom',
                labels: { font: { family: 'Inter', size: 12 }, usePointStyle: true, padding: 20 }
              } 
            },
            animation: { animateScale: true, animateRotate: true }
          }
        });
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'gastronomia' && window.Plotly) {
      // Plotly needs a small delay to ensure container is rendered
      setTimeout(() => {
        const filteredRoma = restaurantsData.filter(r => r.city === 'Roma');
        const filteredToscana = restaurantsData.filter(r => r.city === 'Toscana');

        const traceRoma = {
          x: filteredRoma.map(r => r.price),
          y: filteredRoma.map(r => r.rating),
          mode: 'markers+text', type: 'scatter', name: 'Roma',
          text: filteredRoma.map(r => r.name),
          textposition: 'top center', 
          marker: { size: 16, color: '#C24D2C', opacity: 0.9, line: {color: 'white', width: 2} },
          hoverinfo: 'text+y'
        };
        
        const traceToscana = {
          x: filteredToscana.map(r => r.price),
          y: filteredToscana.map(r => r.rating),
          mode: 'markers+text', type: 'scatter', name: 'Toscana',
          text: filteredToscana.map(r => r.name),
          textposition: 'bottom center', 
          marker: { size: 16, color: '#556B2F', opacity: 0.9, line: {color: 'white', width: 2} },
          hoverinfo: 'text+y'
        };

        const data = [];
        if (restFilter === 'all' || restFilter === 'Roma') data.push(traceRoma);
        if (restFilter === 'all' || restFilter === 'Toscana') data.push(traceToscana);

        const layout = {
          title: { text: 'Calidad (Y) vs Precio (X)', font: { family: 'Playfair Display', size: 20 } },
          xaxis: { title: 'Precio (€)', range: [0.5, 3.5], tickvals: [1, 2, 3], ticktext: ['€', '€€', '€€€'], gridcolor: '#f3f4f6' },
          yaxis: { title: 'Rating (Estrellas)', range: [4.3, 5.0], gridcolor: '#f3f4f6' },
          margin: { t: 50, b: 50, l: 50, r: 20 },
          showlegend: true,
          legend: { orientation: 'h', y: -0.2 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { family: 'Inter', size: 12 },
          hovermode: 'closest',
          transition: {
            duration: 500,
            easing: 'cubic-in-out'
          }
        };

        const config = { displayModeBar: false, responsive: true };
        
        // Use Plotly.react instead of newPlot for efficient updates (filtering) without full redraw
        window.Plotly.react('gastronomyChart', data, layout, config);
      }, 50);
    }
  }, [activeTab, restFilter]);


  // --- Helper Classes ---
  const getTabClass = (tab: TabType) => 
    activeTab === tab 
      ? "relative text-roma-red font-bold pb-2 px-1 whitespace-nowrap transition-all after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-roma-red"
      : "text-gray-400 hover:text-gray-800 pb-2 px-1 whitespace-nowrap transition-all hover:font-medium";

  const getPriceStr = (price: number) => '€'.repeat(price) + '<span class="text-gray-200">' + '€'.repeat(3 - price) + '</span>';

  return (
    <div className="antialiased min-h-screen flex flex-col font-sans bg-cream text-dark scroll-smooth">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16 py-4 md:py-0">
                <div className="flex items-center mb-4 md:mb-0 group cursor-default">
                    <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 group-hover:text-roma-red transition-colors">Viaggio <span className="text-roma-red group-hover:text-gray-900 transition-colors">Italia</span></span>
                    <span className="ml-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 border border-green-200 tracking-wide uppercase">Low Cost Guide</span>
                </div>
                
                <nav className="flex space-x-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                    <button onClick={() => setActiveTab('itinerario')} className={getTabClass('itinerario')}>Itinerario</button>
                    <button onClick={() => setActiveTab('gastronomia')} className={getTabClass('gastronomia')}>Gastronomía</button>
                    <button onClick={() => setActiveTab('transporte')} className={getTabClass('transporte')}>Transporte</button>
                    <button onClick={() => setActiveTab('presupuesto')} className={getTabClass('presupuesto')}>Presupuesto</button>
                </nav>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">

        {/* --- ITINERARIO --- */}
        {activeTab === 'itinerario' && (
          <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
             <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3 tracking-tight">Tu Ruta por Italia</h1>
                <p className="text-gray-500 max-w-2xl mx-auto font-light">Explora cada día de tu aventura. Selecciona una tarjeta para ver el desglose completo, mapas y consejos secretos.</p>
            </div>

            {/* Scroller Container */}
            <div className="relative group mb-8">
              <button 
                onClick={() => handleScroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-roma-red hover:scale-110 transition-all md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 pt-4 gap-4 hide-scrollbar snap-x px-4"
              >
                {itineraryData.map((day) => (
                  <button 
                    key={day.id}
                    onClick={() => setSelectedDay(day)}
                    className={`flex-shrink-0 w-36 md:w-44 p-4 rounded-2xl border transition-all duration-300 snap-center flex flex-col items-center justify-center text-center outline-none ${selectedDay.id === day.id ? `ring-2 ring-offset-4 ring-${day.color} bg-white shadow-xl scale-105 z-10 border-transparent` : 'bg-white/60 border-gray-200 hover:bg-white hover:shadow-md hover:-translate-y-1'}`}
                  >
                      <div className={`mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedDay.id === day.id ? `bg-${day.color} text-white` : 'bg-gray-100 text-gray-500'}`}>{day.date}</div>
                      <span className="font-serif font-bold text-gray-900 leading-tight text-lg">{day.loc}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handleScroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-roma-red hover:scale-110 transition-all md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Detail View */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col lg:flex-row animate-fade-in key={selectedDay.id} transition-all">
               
               {/* Image Side */}
               <div className="lg:w-1/2 relative h-64 lg:h-auto group overflow-hidden">
                    <img src={selectedDay.img} alt={selectedDay.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 lg:p-12">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-${selectedDay.color} text-white text-xs font-bold uppercase mb-4 shadow-lg backdrop-blur-sm bg-opacity-90`}>
                              <MapPin className="w-3 h-3" /> {selectedDay.loc}
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white shadow-sm mb-2">{selectedDay.title}</h2>
                            <p className="text-white/90 text-sm font-light max-w-md">{selectedDay.date}</p>
                        </div>
                    </div>
                    
                    {/* Navigation Overlay */}
                    <div className="absolute inset-0 flex justify-between items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                       {selectedDay.id > 1 && (
                         <button onClick={() => changeDay('prev')} className="pointer-events-auto p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-black hover:scale-110 transition-all transform hover:-translate-x-1">
                           <ChevronLeft className="w-6 h-6" />
                         </button>
                       )}
                       {/* Spacer if first item */}
                       {selectedDay.id === 1 && <div />} 
                       
                       {selectedDay.id < itineraryData.length && (
                         <button onClick={() => changeDay('next')} className="pointer-events-auto p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-black hover:scale-110 transition-all transform hover:translate-x-1">
                           <ChevronRight className="w-6 h-6" />
                         </button>
                       )}
                    </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto bg-white relative">
                    <p className={`text-xl text-gray-700 italic font-serif mb-10 pl-6 border-l-4 border-${selectedDay.color} leading-relaxed`}>
                      "{selectedDay.summary}"
                    </p>
                    
                    <div className="space-y-10 relative before:absolute before:left-3 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100">
                        <div className="relative pl-10 group cursor-default">
                            <div className="absolute left-0 top-0 h-7 w-7 rounded-full border-4 border-white bg-yellow-400 shadow-md z-10 flex items-center justify-center text-[10px] ring-1 ring-gray-100 transition-transform group-hover:scale-110">☀️</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2 group-hover:text-yellow-600 transition-colors">Mañana</h4>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{selectedDay.morning}</p>
                            </div>
                        </div>
                        <div className="relative pl-10 group cursor-default">
                            <div className="absolute left-0 top-0 h-7 w-7 rounded-full border-4 border-white bg-orange-400 shadow-md z-10 flex items-center justify-center text-[10px] ring-1 ring-gray-100 transition-transform group-hover:scale-110">🌤️</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2 group-hover:text-orange-600 transition-colors">Tarde</h4>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{selectedDay.afternoon}</p>
                            </div>
                        </div>
                        <div className="relative pl-10 group cursor-default">
                            <div className="absolute left-0 top-0 h-7 w-7 rounded-full border-4 border-white bg-blue-900 shadow-md z-10 flex items-center justify-center text-[10px] ring-1 ring-gray-100 transition-transform group-hover:scale-110">🌙</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2 group-hover:text-blue-800 transition-colors">Noche</h4>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{selectedDay.evening}</p>
                            </div>
                        </div>
                    </div>

                    {selectedDay.options && (
                      <div className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-inner hover:shadow-md transition-shadow">
                          <h5 className="font-bold text-gray-900 text-sm flex items-center mb-3 gap-2 uppercase tracking-wide">
                              <span className="text-xl animate-pulse">💡</span> Consejo Pro
                          </h5>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedDay.options}</p>
                      </div>
                    )}
                </div>
            </div>
          </section>
        )}

        {/* --- GASTRONOMIA --- */}
        {activeTab === 'gastronomia' && (
          <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Mapa de Sabores</h2>
                    <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                        Hemos filtrado las "trampas para turistas". Esta gráfica muestra los mejores sitios donde la relación <strong>Calidad-Precio</strong> es excelente.
                        <br/><br/>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Leyenda de Precios:</span><br/>
                        <span className="text-gray-800 font-medium">€</span> = &lt;15€ (Street food)<br/>
                        <span className="text-gray-800 font-medium">€€</span> = 15-30€ (Trattoria)<br/>
                        <span className="text-gray-800 font-medium">€€€</span> = &gt;35€ (Gourmet)
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <button onClick={() => setRestFilter('all')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all transform active:scale-95 duration-200 ${restFilter === 'all' ? 'bg-gray-900 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Todos</button>
                        <button onClick={() => setRestFilter('Roma')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all transform active:scale-95 duration-200 ${restFilter === 'Roma' ? 'bg-roma-red text-white shadow-lg scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:border-roma-red hover:text-roma-red'}`}>Roma</button>
                        <button onClick={() => setRestFilter('Toscana')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all transform active:scale-95 duration-200 ${restFilter === 'Toscana' ? 'bg-toscana-green text-white shadow-lg scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:border-toscana-green hover:text-toscana-green'}`}>Toscana</button>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                       <ExternalLink className="w-24 h-24" />
                    </div>
                    <div id="gastronomyChart" style={{width: '100%', height: '350px'}}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurantsData
                .filter(r => restFilter === 'all' || r.city === restFilter)
                .map((r, i) => (
                  <div key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                    <div className="p-6 flex-grow relative">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg shadow-sm">★ {r.rating}</div>
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-1 rounded-full">{r.city} • {r.area}</span>
                        </div>
                        <h3 className="font-serif font-bold text-gray-900 text-xl mb-1 group-hover:text-roma-red transition-colors">{r.name}</h3>
                        <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wide">{r.type}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs group-hover:bg-gray-100 transition-colors">
                        <div className="font-mono text-gray-800 font-bold text-base bg-white px-2 py-1 rounded border border-gray-200" dangerouslySetInnerHTML={{__html: getPriceStr(r.price)}} />
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + ' ' + r.city)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline font-medium">
                           Ver Mapa <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* --- TRANSPORTE --- */}
        {activeTab === 'transporte' && (
          <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Roma */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-roma-red hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-100 rounded-full text-roma-red"><MapPin className="w-6 h-6" /></div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900">Moverse en Roma</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">Roma se camina, pero el metro es útil para distancias largas. El sistema ATAC integra Bus, Metro y Tren Urbano.</p>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors cursor-default">
                            <div>
                                <span className="font-bold text-gray-900 block">Billete Sencillo (BIT)</span>
                                <span className="text-xs text-gray-500">100 min (1 metro, bus ilimitado)</span>
                            </div>
                            <span className="text-2xl font-bold text-roma-red">1,50€</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors cursor-default">
                            <div>
                                <span className="font-bold text-gray-900 block">Roma 24H</span>
                                <span className="text-xs text-gray-500">Viajes ilimitados 24h</span>
                            </div>
                            <span className="text-2xl font-bold text-roma-red">7,00€</span>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-xl border border-yellow-100 flex gap-3">
                        <span className="text-2xl">💳</span>
                        <p><strong>Tap & Go:</strong> No hace falta comprar billete físico. Pasa tu tarjeta contactless directamente por el torno del metro.</p>
                    </div>
                </div>

                {/* Toscana */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-toscana-green hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="p-3 bg-green-100 rounded-full text-toscana-green"><MapPin className="w-6 h-6" /></div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900">Ruta Toscana</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">La combinación ganadora: Tren de alta velocidad hasta Florencia y coche solo para la campiña.</p>
                    
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">🚄</span>
                            <div>
                                <strong className="text-gray-900">Roma a Florencia</strong>
                                <p className="text-sm text-gray-600 mt-1">Tren "Italo" o "Frecciarossa" si reservas antes. Si no, Regionale Veloce (3h 40m).</p>
                                <span className="inline-block mt-2 text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded">Coste: ~22€</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">🚘</span>
                            <div>
                                <strong className="text-gray-900">Alquiler Coche (3 Días)</strong>
                                <p className="text-sm text-gray-600 mt-1">Alquila en Via Sansovino (Florencia). Sal directo a la autopista.</p>
                                <span className="inline-block mt-2 text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded">Coste: ~40€/pp</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Tabla Monumentos */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="font-serif font-bold text-xl text-gray-900">Precios Oficiales Entradas</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">🇪🇺 Joven (18-25) = ~2€-4€</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-gray-400 bg-gray-50 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-8 py-4 font-medium">Monumento</th>
                                <th className="px-8 py-4 font-medium">Precio Adulto</th>
                                <th className="px-8 py-4 font-medium">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                           {monumentsData.map((m, i) => (
                             <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-4 font-bold text-gray-900">{m.name}</td>
                                <td className="px-8 py-4 text-gray-600 font-mono text-base">{m.price}€</td>
                                <td className="px-8 py-4">
                                  <a href={m.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-roma-red hover:text-red-700 font-bold text-xs uppercase tracking-wide transition-colors">
                                    Reservar <ExternalLink className="w-3 h-3" />
                                  </a>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>
        )}

        {/* --- PRESUPUESTO --- */}
        {activeTab === 'presupuesto' && (
          <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
             <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                
                <div className="w-full md:w-1/2 h-80 relative">
                    <canvas ref={budgetChartRef}></canvas>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                       <span className="text-sm text-gray-400 uppercase tracking-widest font-bold">Total</span>
                       <span className="text-4xl font-serif font-bold text-gray-900">668€</span>
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                    <div className="text-center md:text-left mb-8">
                      <h2 className="text-3xl font-serif font-bold text-gray-900">Desglose del Viaje</h2>
                      <p className="text-gray-500 mt-2">Estimación para 8 días completos en temporada media.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">✈️</span>
                              <span className="text-gray-700 font-medium">Vuelos (OPO-Italia)</span>
                            </div>
                            <span className="font-bold text-lg text-gray-900">250€</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🏠</span>
                              <span className="text-gray-700 font-medium">Alojamiento (pp)</span>
                            </div>
                            <span className="font-bold text-lg text-orange-600">250€</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🚗</span>
                              <span className="text-gray-700 font-medium">Transporte</span>
                            </div>
                            <span className="font-bold text-lg text-green-600">60€</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🎟️</span>
                              <span className="text-gray-700 font-medium">Entradas</span>
                            </div>
                            <span className="font-bold text-lg text-blue-600">108€</span>
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100 text-right">
                       <p className="text-xs text-gray-400 italic">No incluye comidas (~150€ extra)</p>
                    </div>
                </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default App;