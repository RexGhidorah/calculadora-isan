import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Info, Car, FileText, AlertCircle, DollarSign, ChevronDown, Zap, Fuel, Leaf, Palette, Sparkles, Truck, Search, X, Copy, Check, ArrowDown, MinusCircle, CarFront } from 'lucide-react';

const App = () => {
  const THEMES = {
    "BMW": {
      primary: "bg-[#16588E]",
      secondary: "bg-blue-50",
      accent: "text-[#16588E]",
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
      ring: "focus:ring-blue-500/20",
      banner: "bg-slate-900",
      badge: "bg-blue-100 text-blue-700 border-blue-200",
      glow: "shadow-blue-200"
    },
    "Nissan": {
      primary: "bg-red-600",
      secondary: "bg-red-50",
      accent: "text-red-600",
      border: "border-red-200",
      button: "bg-red-600 hover:bg-red-700",
      ring: "focus:ring-red-500/20",
      banner: "bg-zinc-900",
      badge: "bg-red-100 text-red-700 border-red-200",
      glow: "shadow-red-200"
    },
    "MG": {
      primary: "bg-rose-700",
      secondary: "bg-rose-50",
      accent: "text-rose-700",
      border: "border-rose-200",
      button: "bg-rose-700 hover:bg-rose-800",
      ring: "focus:ring-rose-500/20",
      banner: "bg-stone-900",
      badge: "bg-rose-100 text-rose-700 border-rose-200",
      glow: "shadow-rose-200"
    },
    "Default": {
      primary: "bg-slate-700",
      secondary: "bg-slate-50",
      accent: "text-slate-700",
      border: "border-slate-200",
      button: "bg-slate-700 hover:bg-slate-800",
      ring: "focus:ring-slate-500/20",
      banner: "bg-slate-900",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      glow: "shadow-slate-200"
    }
  };

  const CATALOGO = {
    "BMW": [
      { modelo: "i3", variante: "Base 120Ah", motor: "Eléctrico", precio: 1165000 },
      { modelo: "i4", variante: "eDrive35", motor: "Eléctrico", precio: 1350000 },
      { modelo: "i4", variante: "eDrive40", motor: "Eléctrico", precio: 1520000 },
      { modelo: "i4", variante: "M50 xDrive", motor: "Eléctrico", precio: 1780000 },
      { modelo: "i5", variante: "eDrive40", motor: "Eléctrico", precio: 1620000 },
      { modelo: "i5", variante: "M60 xDrive", motor: "Eléctrico", precio: 2250000 },
      { modelo: "i7", variante: "xDrive60", motor: "Eléctrico", precio: 3450000 },
      { modelo: "i7", variante: "M70 xDrive", motor: "Eléctrico", precio: 4100000 },
      { modelo: "iX", variante: "xDrive40", motor: "Eléctrico", precio: 1850000 },
      { modelo: "iX", variante: "xDrive50", motor: "Eléctrico", precio: 2350000 },
      { modelo: "5 Series", variante: "550e xDrive", motor: "Híbrido", precio: 1890000 },
      { modelo: "7 Series", variante: "750e xDrive", motor: "Híbrido", precio: 2650000 },
      { modelo: "X5", variante: "xDrive50e", motor: "Híbrido", precio: 2150000 },
      { modelo: "X3", variante: "xDrive30e", motor: "Híbrido", precio: 1450000 },
      { modelo: "X1", variante: "xDrive25e", motor: "Híbrido", precio: 1150000 },
      { modelo: "3 Series", variante: "330e", motor: "Híbrido", precio: 1280000 },
      { modelo: "3 Series", variante: "320i", motor: "Gasolina", precio: 1050000 },
      { modelo: "X5", variante: "xDrive40i", motor: "Gasolina", precio: 1750000 }
    ],
    "Nissan": [
      { modelo: "Leaf", variante: "SV", motor: "Eléctrico", precio: 940000 },
      { modelo: "Leaf", variante: "SL", motor: "Eléctrico", precio: 995000 },
      { modelo: "Ariya", variante: "Advance", motor: "Eléctrico", precio: 1150000 },
      { modelo: "Ariya", variante: "Evolve", motor: "Eléctrico", precio: 1320000 },
      { modelo: "Rogue", variante: "Hybrid", motor: "Híbrido", precio: 850000 },
      { modelo: "Qashqai", variante: "e-POWER", motor: "Híbrido", precio: 785000 },
      { modelo: "X-Trail", variante: "e-POWER", motor: "Híbrido", precio: 895000 },
      { modelo: "Juke", variante: "Hybrid", motor: "Híbrido", precio: 680000 },
      { modelo: "Kicks", variante: "e-POWER", motor: "Híbrido", precio: 585000 },
      { modelo: "Sentra", variante: "SR", motor: "Gasolina", precio: 545000 },
      { modelo: "Versa", variante: "Advance", motor: "Gasolina", precio: 385000 },
      { modelo: "Frontier", variante: "SE TM", motor: "Gasolina", precio: 501900, esCamion: true },
      { modelo: "Frontier", variante: "XE TM", motor: "Gasolina", precio: 568900, esCamion: true },
      { modelo: "Frontier", variante: "LE TM", motor: "Gasolina", precio: 661900, esCamion: true },
      { modelo: "Frontier", variante: "LE TA", motor: "Gasolina", precio: 683900, esCamion: true },
      { modelo: "Frontier", variante: "Platinum LE", motor: "Gasolina", precio: 778900, esCamion: true },
      { modelo: "Frontier", variante: "Pro-4X  4X4 TA", motor: "Gasolina", precio: 810900, esCamion: true },
      { modelo: "Frontier", variante: "DC Diesel 4x4 TM", motor: "Gasolina", precio: 624900, esCamion: true },
      { modelo: "NP300", variante: "Chasis Cabina", motor: "Gasolina", precio: 455000, esCamion: true }
    ],
    "MG": [
      { modelo: "ZS", variante: "Turbo Elegance", motor: "Gasolina", precio: 485000 },
      { modelo: "ZS", variante: "Hybrid+ Excite", motor: "Híbrido", precio: 515000 },
      { modelo: "ZS", variante: "Hybrid+ Elegance", motor: "Híbrido", precio: 565000 },
      { modelo: "HS", variante: "HEV", motor: "Híbrido", precio: 825000 },
      { modelo: "HS", variante: "Trophy", motor: "Gasolina", precio: 645000 },
      { modelo: "EP", variante: "Comfort", motor: "Eléctrico", precio: 795000 },
      { modelo: "EP", variante: "Deluxe", motor: "Eléctrico", precio: 865000 },
      { modelo: "MG4", variante: "Standard", motor: "Eléctrico", precio: 635000 },
      { modelo: "MG4", variante: "Extended Range", motor: "Eléctrico", precio: 815000 },
      { modelo: "Cyberster", variante: "100 Aniversario", motor: "Eléctrico", precio: 2150000 },
      { modelo: "MG 3", variante: "Hybrid Plus", motor: "Híbrido", precio: 435000 },
      { modelo: "GT", variante: "Trophy", motor: "Gasolina", precio: 475000 }
    ]
  };

  const TARIFA = [
    { limite_inferior: 0.01, limite_superior: 383940.35, cuota_fija: 0.0, tasa: 2.0 },
    { limite_inferior: 383940.36, limite_superior: 460728.35, cuota_fija: 7678.67, tasa: 5.0 },
    { limite_inferior: 460728.36, limite_superior: 537516.64, cuota_fija: 11518.25, tasa: 10.0 },
    { limite_inferior: 537516.65, limite_superior: 691092.34, cuota_fija: 19197.04, tasa: 15.0 },
    { limite_inferior: 691092.35, limite_superior: Infinity, cuota_fija: 42233.35, tasa: 17.0 },
  ];

  const EXENTO_MAXIMO = 356934.05;
  const EXENCION_50_MIN = 356934.06;
  const EXENCION_50_MAX = 452116.48;
  const UMBRAL_REDUCCION = 1060189.93;
  const TASA_REDUCCION = 0.07;
  const TASA_IVA = 0.16;

  const [precioBaseCalculado, setPrecioBaseCalculado] = useState(0);
  const [inputValue, setInputValue] = useState("690,300");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  // NUEVO ESTADO: 'auto', 'camion', 'electrico'
  const [tipoVehiculoManual, setTipoVehiculoManual] = useState("auto");

  useEffect(() => {
    // Leer marca de sessionStorage si existe
    const authDataRaw = sessionStorage.getItem('authData');
    if (authDataRaw) {
      try {
        const authData = JSON.parse(authDataRaw);
        if (authData.marca) {
          setMarcaSeleccionada(authData.marca);
        }
      } catch (e) {
        console.error("Error parsing authData from sessionStorage", e);
      }
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  // --- LÓGICA INVERSA CORREGIDA (Soporta Reducción de Lujo) ---
  const calcularPrecioBaseDesdeFinal = (precioFinal, esCamion, esHibrido) => {
    if (!precioFinal || precioFinal <= 0) return 0;

    // 1. Quitar IVA para obtener el Subtotal (Base + ISAN)
    const subtotalConIsan = precioFinal / (1 + TASA_IVA);

    if (esCamion) return subtotalConIsan / 1.05;

    // 2. Determinar si el precio está en el rango de REDUCCIÓN (Lujo)
    // Calculamos el subtotal teórico exacto en el punto del umbral
    const tramoAlto = TARIFA[TARIFA.length - 1];
    const isanEnUmbral = tramoAlto.cuota_fija + ((UMBRAL_REDUCCION - tramoAlto.limite_inferior) * (tramoAlto.tasa / 100));
    const subtotalEnUmbral = UMBRAL_REDUCCION + isanEnUmbral;

    if (subtotalConIsan > subtotalEnUmbral) {
      // DESPEJE PARA EL TRAMO DE LUJO (Incluye la reducción del 7%)
      // La fórmula derivada considera que el ISAN se reduce en un 7% del excedente
      const tasaISAN = tramoAlto.tasa / 100;
      const numerador = subtotalConIsan - tramoAlto.cuota_fija + (tramoAlto.limite_inferior * tasaISAN) - (UMBRAL_REDUCCION * TASA_REDUCCION);
      const denominador = 1 + tasaISAN - TASA_REDUCCION;
      return numerador / denominador;
    }

    // 3. Despeje para tramos normales
    for (let tramo of TARIFA) {
      const tasaDecimal = tramo.tasa / 100;
      let baseCandidata = (subtotalConIsan - tramo.cuota_fija + (tramo.limite_inferior * tasaDecimal)) / (1 + tasaDecimal);

      // Verificamos si la base cae en el tramo (con margen de error de flotante)
      if (baseCandidata >= tramo.limite_inferior - 0.1 && baseCandidata <= tramo.limite_superior + 0.1) {
        return baseCandidata;
      }
    }
    return subtotalConIsan;
  };

  useEffect(() => {
    const rawVal = inputValue.replace(/[^0-9.]/g, '');
    const precioFinalInput = parseFloat(rawVal);

    // Determinamos el tipo basándonos en el selector MANUAL o en el vehículo del CATÁLOGO
    const esHibrido = tipoVehiculoManual === "electrico" || vehiculoSeleccionado?.motor === "Eléctrico" || vehiculoSeleccionado?.motor === "Híbrido";
    const esCamion = tipoVehiculoManual === "camion" || vehiculoSeleccionado?.esCamion;

    if (!isNaN(precioFinalInput)) {
      const base = calcularPrecioBaseDesdeFinal(precioFinalInput, esCamion, esHibrido);
      setPrecioBaseCalculado(base);
    } else {
      setPrecioBaseCalculado(0);
    }
  }, [inputValue, tipoVehiculoManual, vehiculoSeleccionado]);

  const currentTheme = useMemo(() => {
    if (marcaSeleccionada && THEMES[marcaSeleccionada]) {
      return THEMES[marcaSeleccionada];
    }
    return THEMES.Default;
  }, [marcaSeleccionada]);

  const formatCurrency = (val) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(val);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setVehiculoSeleccionado(null);
  };

  const handleSelectVehiculo = (v, marca) => {
    let isanSimulado = 0;

    if (v.esCamion) {
      isanSimulado = v.precio * 0.05;
    } else {
      const tramo = TARIFA.find(t => v.precio >= t.limite_inferior && v.precio <= t.limite_superior) || TARIFA[TARIFA.length - 1];
      const excedente = v.precio - tramo.limite_inferior;
      const impuestoSobreExcedente = excedente * (tramo.tasa / 100);
      let isanBase = tramo.cuota_fija + impuestoSobreExcedente;

      // Aplicar reducción lujo en simulación directa
      if (v.precio > UMBRAL_REDUCCION) {
        isanBase -= (v.precio - UMBRAL_REDUCCION) * TASA_REDUCCION;
      }
      isanSimulado = isanBase;
    }

    const totalSimulado = (v.precio + isanSimulado) * 1.16;
    setInputValue(totalSimulado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

    // Sincronización visual automática
    if (v.esCamion) setTipoVehiculoManual("camion");
    else if (v.motor === "Eléctrico" || v.motor === "Híbrido") setTipoVehiculoManual("electrico");
    else setTipoVehiculoManual("auto");

    setVehiculoSeleccionado({ ...v, marca });
  };

  const handleCopyIsan = () => {
    if (!resultados) return;
    const rawValue = resultados.isanFull.toFixed(2);
    const textArea = document.createElement("textarea");
    textArea.value = rawValue;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
    document.body.removeChild(textArea);
  };

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.toLowerCase();
    const results = [];
    Object.entries(CATALOGO).forEach(([marca, modelos]) => {
      modelos.forEach(m => {
        if (m.modelo.toLowerCase().includes(term) || m.variante.toLowerCase().includes(term) || m.motor.toLowerCase().includes(term) || marca.toLowerCase().includes(term)) {
          results.push({ ...m, marca });
        }
      });
    });
    return results;
  }, [searchTerm]);

  const resultados = useMemo(() => {
    const precio = precioBaseCalculado;
    if (precio <= 0) return null;

    let isanBase = 0;
    let tramoAplicado = null;

    // Usamos el tipoVehiculoManual o las propiedades del vehículo seleccionado
    let aplicaArt3FraccII = tipoVehiculoManual === "camion" || vehiculoSeleccionado?.esCamion;

    if (aplicaArt3FraccII) {
      isanBase = precio * 0.05;
    } else {
      tramoAplicado = TARIFA.find(t => precio >= t.limite_inferior && precio <= t.limite_superior) || TARIFA[TARIFA.length - 1];
      const excedente = precio - tramoAplicado.limite_inferior;
      const impuestoSobreExcedente = excedente * (tramoAplicado.tasa / 100);
      isanBase = tramoAplicado.cuota_fija + impuestoSobreExcedente;
    }

    let reduccionLujo = 0;
    if (precio > UMBRAL_REDUCCION) {
      reduccionLujo = (precio - UMBRAL_REDUCCION) * TASA_REDUCCION;
    }

    const isanFull = Math.max(isanBase - reduccionLujo, 0);

    let factorExencion = 1.0;
    let motivoExencion = "Tarifa Normal (100%)";
    let badgeColor = "bg-gray-100 text-gray-700 border-gray-200";

    const motor = vehiculoSeleccionado?.motor;
    const esElectricoOHibrido = tipoVehiculoManual === "electrico" || motor === "Eléctrico" || motor === "Híbrido";

    if (esElectricoOHibrido) {
      factorExencion = 0.0;
      motivoExencion = `Vehículo ${motor || "Eléctrico/Híbrido"} (Exento 100%)`;
      badgeColor = "bg-emerald-100 text-emerald-700 border-emerald-200";
    } else if (!aplicaArt3FraccII) {
      if (precio <= EXENTO_MAXIMO) {
        factorExencion = 0.0;
        motivoExencion = `Precio Base Bajo (Exento 100%)`;
        badgeColor = "bg-green-100 text-green-700 border-green-200";
      } else if (precio <= EXENCION_50_MAX) {
        factorExencion = 0.5;
        motivoExencion = `Rango Medio (Exento 50%)`;
        badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
      }
    }

    if (aplicaArt3FraccII) {
      motivoExencion = "Camión/Panel (Tasa Fija 5%)";
      badgeColor = "bg-slate-100 text-slate-700 border-slate-200";
    }

    const isanPagable = isanFull * factorExencion;
    const montoDescuento = isanFull - isanPagable;

    const subtotal = precio + isanFull;
    const iva = subtotal * TASA_IVA;
    const total = subtotal + iva;

    return {
      isanBase,
      reduccionLujo,
      isanFull,
      montoDescuento,
      factorExencion,
      motivoExencion,
      badgeColor,
      iva,
      subtotal,
      total,
      tasaEfectiva: (isanFull / precio) * 100,
      tramo: tramoAplicado,
      aplicaArt3FraccII
    };
  }, [precioBaseCalculado, vehiculoSeleccionado, tipoVehiculoManual]);

  return (
    <div className="min-h-screen transition-all duration-700 bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Dinámico */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <div className={`p-2 rounded-xl transition-all duration-500 shadow-lg ${currentTheme.primary} ${currentTheme.glow} text-white`}>
                <Calculator size={28} />
              </div>
              <span className="tracking-tighter">Calculadora ISAN 2026</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white transition-colors duration-500 ${currentTheme.primary}`}>
                {marcaSeleccionada || "General"}
              </span>
              <p className="text-slate-400 text-xs font-medium italic">Calculo y Desglose del ISAN 2026</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest leading-none mb-1">IVA General</span>
                <span className="text-xl font-black text-slate-700 leading-none">16%</span>
              </div>
              <div className={`w-1 h-8 rounded-full ${currentTheme.primary} opacity-20 transition-colors duration-500`}></div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar: Buscador y Catálogo */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-500 ${currentTheme.accent}`}>
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar modelo..."
                  className={`block w-full pl-10 pr-10 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm transition-all duration-500 focus:bg-white focus:border-transparent ring-offset-2 ring-0 focus:ring-4 ${currentTheme.ring}`}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* SELECTOR VISUAL DE TIPO DE VEHÍCULO */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-6">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                Tipo de Vehículo
              </label>

              <div className="grid grid-cols-3 gap-4">
                {/* Opción 1: Auto */}
                <button
                  onClick={() => { setTipoVehiculoManual("auto"); setVehiculoSeleccionado(null); }}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${tipoVehiculoManual === "auto"
                      ? `${currentTheme.primary} border-transparent text-white shadow-lg scale-105`
                      : "bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100 hover:border-slate-200"
                    }`}
                >
                  <CarFront size={32} strokeWidth={tipoVehiculoManual === "auto" ? 2 : 1.5} />
                  <span className="text-xs font-black uppercase tracking-widest">Auto</span>
                </button>

                {/* Opción 2: Camión */}
                <button
                  onClick={() => { setTipoVehiculoManual("camion"); setVehiculoSeleccionado(null); }}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${tipoVehiculoManual === "camion"
                      ? "bg-[#FF6700] border-transparent text-white shadow-lg scale-105"
                      : "bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100 hover:border-slate-200"
                    }`}
                >
                  <Truck size={32} strokeWidth={tipoVehiculoManual === "camion" ? 2 : 1.5} />
                  <span className="text-xs font-black uppercase tracking-widest">Camión</span>
                </button>

                {/* Opción 3: Eléctrico */}
                <button
                  onClick={() => { setTipoVehiculoManual("electrico"); setVehiculoSeleccionado(null); }}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${tipoVehiculoManual === "electrico"
                      ? "bg-emerald-500 border-transparent text-white shadow-lg scale-105"
                      : "bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100 hover:border-slate-200"
                    }`}
                >
                  <Zap size={32} strokeWidth={tipoVehiculoManual === "electrico" ? 2 : 1.5} />
                  <span className="text-xs font-black uppercase tracking-widest">Eléctrico</span>
                </button>
              </div>
            </div>


            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 h-[560px] flex flex-col relative overflow-hidden">
              <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider flex items-center gap-2 relative z-10">
                {searchTerm ? <><Sparkles size={16} className={currentTheme.accent} /> Resultados</> : <><Palette size={16} className={currentTheme.accent} /> Catálogo</>}
              </h3>

              <div className="space-y-3 overflow-y-auto pr-2 flex-grow scrollbar-thin scrollbar-thumb-slate-200 relative z-10">
                {searchTerm ? (
                  <div className="grid grid-cols-1 gap-2 animate-in fade-in duration-300">
                    {searchResults?.length > 0 ? (
                      searchResults.map(v => {
                        const brandTheme = THEMES[v.marca] || THEMES.Default;
                        const isSelectedModel = vehiculoSeleccionado?.modelo === v.modelo && vehiculoSeleccionado?.variante === v.variante;
                        return (
                          <button
                            key={`${v.marca}-${v.modelo}-${v.variante}`}
                            onClick={() => handleSelectVehiculo(v, v.marca)}
                            className={`text-left p-3.5 rounded-2xl text-xs transition-all flex flex-col gap-1.5 border ${isSelectedModel ? brandTheme.secondary + ' ' + brandTheme.border + ' shadow-md' : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200'}`}
                          >
                            <div className="flex justify-between items-start w-full">
                              <span className="font-black text-slate-800 flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${brandTheme.primary}`}></span>
                                {v.modelo}
                              </span>
                              <span className={`font-mono font-black ${isSelectedModel ? brandTheme.accent : 'text-slate-600'}`}>{formatCurrency(v.precio)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400 font-medium italic">{v.variante} • {v.marca}</span>
                              <div className="flex items-center gap-2">
                                {v.esCamion && <Truck size={12} className={brandTheme.accent} />}
                                <span className={`flex items-center gap-1 font-black uppercase tracking-tighter ${v.motor === 'Gasolina' ? 'text-amber-600' : 'text-emerald-600'}`}>
                                  {v.motor === 'Gasolina' ? <Fuel size={10} /> : <Zap size={10} />}
                                  {v.motor}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-10"><p className="text-xs font-bold text-slate-300">Sin resultados</p></div>
                    )}
                  </div>
                ) : (
                  Object.keys(CATALOGO).map(marca => {
                    const brandTheme = THEMES[marca] || THEMES.Default;
                    const isSelected = marcaSeleccionada === marca;
                    return (
                      <div key={marca} className="space-y-2">
                        <button onClick={() => setMarcaSeleccionada(isSelected ? "" : marca)} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${isSelected ? brandTheme.primary + ' text-white shadow-xl border-transparent scale-[1.02]' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300'}`}>
                          <span className="font-black tracking-tight flex items-center gap-3">
                            {marca} <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>{CATALOGO[marca].length}</span>
                          </span>
                          <ChevronDown size={18} className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`} />
                        </button>

                        {isSelected && (
                          <div className="grid grid-cols-1 gap-1.5 pl-1 animate-in fade-in slide-in-from-top-4 duration-300">
                            {CATALOGO[marca].map(v => {
                              const isSelectedModel = vehiculoSeleccionado?.modelo === v.modelo && vehiculoSeleccionado?.variante === v.variante;
                              return (
                                <button
                                  key={`${v.modelo}-${v.variante}`}
                                  onClick={() => handleSelectVehiculo(v, marca)}
                                  className={`text-left p-3.5 rounded-2xl text-xs transition-all flex flex-col gap-1.5 border group ${isSelectedModel ? brandTheme.secondary + ' ' + brandTheme.border + ' shadow-md ring-1 ' + brandTheme.border : 'bg-white/50 border-slate-100 hover:bg-white hover:border-slate-200'}`}
                                >
                                  <div className="flex justify-between items-start w-full">
                                    <span className={`font-bold transition-colors ${isSelectedModel ? brandTheme.accent : 'text-slate-800'}`}>{v.modelo}</span>
                                    <span className={`font-mono font-black ${isSelectedModel ? brandTheme.accent : 'text-slate-400 group-hover:text-slate-600'}`}>{formatCurrency(v.precio)}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-slate-400 font-medium italic">{v.variante}</span>
                                    <div className="flex items-center gap-2">
                                      {v.esCamion && <Truck size={12} className={brandTheme.accent} />}
                                      <span className={`flex items-center gap-1 font-black uppercase tracking-tighter ${v.motor === 'Gasolina' ? 'text-amber-600' : 'text-emerald-600'}`}>
                                        {v.motor === 'Gasolina' ? <Fuel size={10} /> : <Zap size={10} />}
                                        {v.motor}
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
              <div className={`absolute -right-12 -bottom-12 opacity-[0.03] transition-colors duration-500 ${currentTheme.accent}`}>
                <Sparkles size={160} />
              </div>
            </div>
          </div>

          {/* Área de Cálculo Principal */}
          <div className="lg:col-span-8 space-y-8">

            {/* INPUT PRECIO FINAL */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group transition-all duration-500">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                Precio de Lista (ISAN 100% + IVA)
              </label>

              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none transition-colors duration-700 ${currentTheme.accent} opacity-20`}>
                  <DollarSign size={42} strokeWidth={3} />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className={`block w-full pl-14 pr-4 py-6 bg-slate-50/50 border-2 border-slate-100 rounded-3xl focus:ring-8 transition-all duration-500 text-5xl font-black text-slate-800 ${currentTheme.ring} focus:border-slate-300 focus:bg-white`}
                  placeholder="0.00"
                />
              </div>
            </div>

            {!resultados ? (
              <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center animate-pulse">
                <Calculator size={48} className="text-slate-200 mb-4" />
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm text-balance">Introduce el precio final para calcular la base</h3>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* BANNER PRECIO BASE */}
                <div className={`transition-all duration-700 ${currentTheme.banner} rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group`}>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest backdrop-blur-sm">Valor Factura</span>
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Costo Base Calculado</span>
                      </div>
                      <div className="text-6xl md:text-7xl font-black mt-2 text-white tracking-tighter transition-all duration-500">
                        {formatCurrency(precioBaseCalculado)}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="bg-emerald-500/20 backdrop-blur-md text-emerald-100 px-5 py-2 rounded-2xl text-xs font-black mb-3 border border-emerald-500/30 flex items-center gap-2 shadow-lg">
                        <Check size={14} /> CÁLCULO FINAL
                      </div>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Base + ISAN 100% + IVA</p>
                    </div>
                  </div>
                  <div className="absolute -right-16 -bottom-16 opacity-[0.05] rotate-12 transition-transform duration-1000 group-hover:rotate-0">
                    <Car size={300} />
                  </div>
                </div>

                {/* DESGLOSE EN CASCADA */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50/80 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className={`transition-colors duration-500 ${currentTheme.accent}`} />
                      <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">Desgloce de Precio e Impuestos</h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Desglose 100%</span>
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    {/* COLUMNA 1: SUMA ISAN */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Precio Base</span>
                        <span className="font-mono font-bold text-slate-600">{formatCurrency(precioBaseCalculado)}</span>
                      </div>

                      {/* FILA DE ISAN 100% */}
                      <div className="flex justify-between items-center relative">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-slate-300"><Sparkles size={12} /></div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${currentTheme.accent}`}>2. (+) ISAN (100%)</span>
                        <span className={`font-mono font-black text-lg ${currentTheme.accent}`}>{formatCurrency(resultados.isanFull)}</span>
                      </div>

                      {/* WIDGET UNIFICADO DE EXENCIONES Y BENEFICIOS */}
                      <div className={`p-3 rounded-2xl border space-y-3 ${resultados.badgeColor} transition-all duration-500`}>
                        {/* Fila 1: Motivo de Exención */}
                        <div className="flex items-start gap-2.5">
                          <Info size={16} className="flex-shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-wider">Régimen de Exención</span>
                            <span className="text-[11px] font-medium leading-tight">{resultados.motivoExencion}</span>
                          </div>
                        </div>

                        {/* Fila 2: Reducción de Lujo (Condicional) */}
                        {resultados.reduccionLujo > 0 && (
                          <div className="pt-2 border-t border-current opacity-60 flex items-start gap-2.5">
                            <Sparkles size={16} className="flex-shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-wider">Estímulo Art. 3 (Lujo)</span>
                              <span className="text-[11px] font-medium leading-tight">
                                Reducción de {formatCurrency(resultados.reduccionLujo)} aplicada al ISAN bruto.
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* FILA DE DESCUENTO FINAL (si aplica exención) */}
                      {resultados.montoDescuento > 0 && (
                        <div className="flex justify-between items-center text-emerald-600 animate-in fade-in slide-in-from-top-1 pt-1">
                          <span className="text-[13px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <MinusCircle size={12} /> Exención Aplicable
                          </span>
                          <span className="font-mono font-bold text-s">-{formatCurrency(resultados.montoDescuento)}</span>
                        </div>
                      )}

                      <div className="border-t border-slate-200 pt-2 flex justify-between items-center opacity-70">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Subtotal (Full)</span>
                        <span className="font-mono font-bold text-slate-800">{formatCurrency(resultados.subtotal)}</span>
                      </div>
                    </div>

                    {/* FLECHA CONECTOR */}
                    <div className="md:col-span-2 flex justify-center py-4 md:py-0">
                      <div className="bg-slate-50 p-2 rounded-full border border-slate-100 text-slate-300">
                        <ArrowDown size={20} className="md:-rotate-90" />
                      </div>
                    </div>

                    {/* COLUMNA 2: SUMA IVA Y TOTAL */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="flex justify-between items-center opacity-50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                        <span className="font-mono font-bold text-slate-600">{formatCurrency(resultados.subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">3. (+) IVA 16%</span>
                        <span className="font-mono font-bold text-slate-600">{formatCurrency(resultados.iva)}</span>
                      </div>
                      <div className={`p-4 rounded-2xl ${currentTheme.secondary} ${currentTheme.border} border flex justify-between items-center mt-2`}>
                        <span className={`text-xs font-black uppercase tracking-widest ${currentTheme.accent}`}>Total Lista</span>
                        <span className={`font-mono font-black text-xl ${currentTheme.accent}`}>{formatCurrency(resultados.total)}</span>
                      </div>

                      <div className="text-[9px] text-slate-400 text-right leading-tight mt-1">
                        * Total calculado con impuestos al 100%.<br />Los descuentos por exención no se restan.
                      </div>

                      <div className="flex justify-end mt-2">
                        <button onClick={handleCopyIsan} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors">
                          {copied ? <Check size={10} /> : <Copy size={10} />} {copied ? "Copiado" : "Copiar ISAN 100%"}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* FOOTER DEL CARD */}
                  <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div className="text-center border-r border-slate-200">
                      <span className="block text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Tasa Efectiva (Bruta)</span>
                      <span className="font-black text-slate-700">{resultados.tasaEfectiva.toFixed(2)}%</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Régimen</span>
                      <span className="font-black text-slate-700">{resultados.aplicaArt3FraccII ? '5% Camiones' : 'Tarifa General'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 pt-10 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6">
            LEY FEDERAL DEL ISAN • ANEXO 15 RMF 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;