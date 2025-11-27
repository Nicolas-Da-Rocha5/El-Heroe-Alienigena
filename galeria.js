document.addEventListener('DOMContentLoaded', () => {

  let currentIndex = 0;
  let currentGallery = 'personajes';
  let thumbs = [];

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const caption = document.getElementById('caption');
  const closeBtn = document.getElementById('closeBtn');  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const thumbnailStrip = document.getElementById('thumbnailStrip');
  const personajesContainer = document.getElementById('personajes-container');
  const aliensContainer = document.getElementById('aliens-container');
  const lightboxWrapper = document.querySelector('.lightbox-img-wrapper');

  const saveActiveTab = (tabId) => {
    localStorage.setItem('activeTabBen10', tabId);
  };

  const getActiveTab = () => {
    return localStorage.getItem('activeTabBen10') || 'personajes';
  };

  const activateTab = (tabId) => {
    document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
      el.classList.remove('active');
    });

	const btn = document.querySelector(`[data-tab="${tabId}"]`);
    const section = document.getElementById(tabId);

    if (btn && section) {
      btn.classList.add('active');
      section.classList.add('active');
    }
  };

  const savedTab = getActiveTab();
  activateTab(savedTab);

   document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tabId = btn.dataset.tab;

      activateTab(tabId);

      saveActiveTab(tabId);
    };
  });

	const personajesData = [
    {
      nombre: "BEN 10: SERIE ORIGINAL",
      carpeta: "original",
      versiones: [
        "ben_original", "gwen_original", "max_original", "kevin_original", "vilgax_original",
        "tetrax_original", "animo_original", "azmuth_original", "charmcaster_original",
        "hex_original", "zombozo_original", "terhor_original", "kai_original", "vulkanus_original"
      ],
      descripciones: {
        "ben_original": "BEN TENNYSON (SERIE ORIGINAL)",
        "gwen_original": "GWEN TENNYSON (SERIE ORIGINAL)",
        "max_original": "MAX TENNYSON (SERIE ORIGINAL)",
        "kevin_original": "KEVIN LEVIN (SERIE ORIGINAL)",
        "vilgax_original": "VILGAX (SERIE ORIGINAL)",
        "tetrax_original": "TETRAX SHARD (SERIE ORIGINAL)",
        "animo_original": "DOCTOR ANIMO (SERIE ORIGINAL)",
        "azmuth_original": "AZMUTH (SERIE ORIGINAL)",
        "charmcaster_original": "CHARMCASTER (SERIE ORIGINAL)",
        "hex_original": "HEX (SERIE ORIGINAL)",
        "zombozo_original": "ZOMBOZO (SERIE ORIGINAL)",
        "terhor_original": "EL'TERHOR (SERIE ORIGINAL)",
        "kai_original": "KAI GREEN (SERIE ORIGINAL)",
        "vulkanus_original": "VULKANUS (SERIE ORIGINAL)"
      }
    },
    {
      nombre: "BEN 10: FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA",
      carpeta: "fuerza_alienigena",
      versiones: [
        "ben_alienforce", "gwen_alienforce", "max_alienforce", "kevin_alienforce", "vilgax_alienforce",
        "tetrax_alienforce", "animo_alienforce", "azmuth_alienforce", "charmcaster_alienforce",
        "hex_alienforce", "zombozo_alienforce", "terhor_alienforce", "vulkanus_alienforce",
        "albedo_alienforce", "albedogalvan_alienforce", "julie_alienforce", "paradox_alienforce", "attea_alienforce",
        "argit_alienforce", "psyphon_alienforce", "aggregor_alienforce", "george_alienforce"
      ],
      descripciones: {
        "ben_alienforce": "BEN TENNYSON (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)",
        "gwen_alienforce": "GWEN TENNYSON (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)",
        "max_alienforce": "MAX TENNYSON (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"kevin_alienforce": "KEVIN LEVIN (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"vilgax_alienforce": "VILGAX (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"tetrax_alienforce": "TETRAX SHARD (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"animo_alienforce": "DOCTOR ANIMO (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"azmuth_alienforce": "AZMUTH (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"charmcaster_alienforce": "CHARMCASTER (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"hex_alienforce": "HEX (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"zombozo_alienforce": "ZOMBOZO (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"terhor_alienforce": "EL'TERHOR (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"vulkanus_alienforce": "VULKANUS (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"albedo_alienforce": "ALBEDO (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"albedogalvan_alienforce": "ALBEDO GALVAN (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"julie_alienforce": "JULIE YAMAMOTO (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"paradox_alienforce": "DOCTOR PARADOX (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"attea_alienforce": "ATTEA (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"argit_alienforce": "ARGIT (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"psyphon_alienforce": "PSYPHON (FUERZA ALIENÍGENA Y SUPREMACÍA ALIENÍGENA)" , 
		"aggregor_alienforce": "AGGREGOR (SUPREMACÍA ALIENÍGENA)" , 
        "george_alienforce": "SIR GEORGE (SUPREMACÍA ALIENÍGENA)"
      }
    },
    {
      nombre: "BEN 10: OMNIVERSE",
      carpeta: "omniverse",
      versiones: [
        "ben_omniverse", "gwen_omniverse", "max_omniverse", "kevin_omniverse", "vilgax_omniverse",
        "tetrax_omniverse", "animo_omniverse", "azmuth_omniverse", "charmcaster_omniverse",
        "hex_omniverse", "zombozo_omniverse", "rook_omniverse", "terhor_omniverse", "vulkanus_omniverse",
        "albedo_omniverse", "albedogalvan_omniverse", "julie_omniverse", "paradox_omniverse", "attea_omniverse", "argit_omniverse",
        "psyphon_omniverse", "eon_omniverse", "kai_omniverse", "khyber_omniverse", "looma_omniverse",
        "maltruant_omniverse", "malware_omniverse", "psychobos_omniverse", "ester_omniverse", "skurd_omniverse"
      ],
      descripciones: {
        "ben_omniverse": "BEN TENNYSON (OMNIVERSE)",
        "gwen_omniverse": "GWEN TENNYSON (OMNIVERSE)" , 
		"max_omniverse": "MAX TENNYSON (OMNIVERSE)" , 
		"kevin_omniverse": "KEVIN LEVIN (OMNIVERSE)" , 
		"vilgax_omniverse": "VILGAX (OMNIVERSE)" , 
		"tetrax_omniverse": "TETRAX SHARD (OMNIVERSE)" , 
		"animo_omniverse": "DOCTOR ANIMO (OMNIVERSE)" , 
		"azmuth_omniverse": "AZMUTH (OMNIVERSE)" , 
		"charmcaster_omniverse": "CHARMCASTER (OMNIVERSE)" , 
		"hex_omniverse": "HEX (OMNIVERSE)" , 
		"zombozo_omniverse": "ZOMBOZO (OMNIVERSE)" , 
		"rook_omniverse": "ROOK (OMNIVERSE)" , 
		"terhor_omniverse": "EL'TERHOR (OMNIVERSE)" , 
		"vulkanus_omniverse": "VULKANUS (OMNIVERSE)" , 
		"albedo_omniverse": "ALBEDO (OMNIVERSE)" , 
		"albedogalvan_omniverse": "ALBEDO GALVAN (OMNIVERSE)" , 
		"julie_omniverse": "JULIE YAMAMOTO (OMNIVERSE)" , 
		"paradox_omniverse": "DOCTOR PARADOX (OMNIVERSE)" , 
		"attea_omniverse": "ATTEA (OMNIVERSE)" , 
		"argit_omniverse": "ARGIT (OMNIVERSE)" , 
		"psyphon_omniverse": "PSYPHON (OMNIVERSE)" , 
		"eon_omniverse": "EON (OMNIVERSE)" , 
		"kai_omniverse": "KAI GREEN (OMNIVERSE)" , 
		"khyber_omniverse": "KHYBER (OMNIVERSE)" , 
		"looma_omniverse": "LOOMA VIENTO ROJO (OMNIVERSE)" , 
		"maltruant_omniverse": "MALTRUANT (OMNIVERSE)" , 
		"malware_omniverse": "MALWARE (OMNIVERSE)" , 
		"psychobos_omniverse": "DOCTOR PSYCHOBOS (OMNIVERSE)" , 
		"ester_omniverse": "ESTER (OMNIVERSE)" , 
        "skurd_omniverse": "SKURD (OMNIVERSE)"
      }
    },
    {
      nombre: "BEN 10: REBOOT",
      carpeta: "reboot",
      versiones: [
        "ben_reboot", "gwen_reboot", "max_reboot", "kevin_reboot", "vilgax_reboot",
        "tetrax_reboot", "animo_reboot", "azmuth_reboot", "charmcaster_reboot",
        "hex_reboot", "zombozo_reboot"
      ],
      descripciones: {
        "ben_reboot": "BEN TENNYSON (REBOOT)",
        "gwen_reboot": "GWEN TENNYSON (REBOOT)" , 
		"max_reboot": "MAX TENNYSON (REBOOT)" , 
		"kevin_reboot": "KEVIN LEVIN (REBOOT)" , 
		"vilgax_reboot": "VILGAX (REBOOT)" , 
		"tetrax_reboot": "TETRAX SHARD (REBOOT)" , 
		"animo_reboot": "DOCTOR ANIMO (REBOOT)" , 
		"azmuth_reboot": "AZMUTH (REBOOT)" , 
		"charmcaster_reboot": "CHARMCASTER (REBOOT)" , 
		"hex_reboot": "HEX (REBOOT)" , 
        "zombozo_reboot": "ZOMBOZO (REBOOT)"
      }
    }
  ];

  let allPersonajesImages = [];
  let allPersonajesCaptions = [];

  personajesData.forEach(seccion => {
    const titulo = document.createElement('h2');
    titulo.className = 'personaje-titulo';
    titulo.textContent = seccion.nombre;
    personajesContainer.appendChild(titulo);

    const grid = document.createElement('div');
    grid.className = 'personaje-grid';
    
    seccion.versiones.forEach(id => {
      const ruta = `imagenes/personajes/${seccion.carpeta}/${id}.jpg`;
      const descripcion = seccion.descripciones[id] || id.toUpperCase();

      const img = document.createElement('img');
      img.src = ruta;
      img.alt = descripcion;
      img.title = descripcion;
      img.loading = 'lazy';
      
      img.onclick = () => {
        const index = allPersonajesImages.indexOf(ruta);
        if (index !== -1) openLightboxPersonajes(index);
      };

      allPersonajesImages.push(ruta);
      allPersonajesCaptions.push(descripcion);

      grid.appendChild(img);
    });

    personajesContainer.appendChild(grid);
  });

  window.allPersonajesImages = allPersonajesImages;
  window.allPersonajesCaptions = allPersonajesCaptions;

  const aliensData = [
    {
      nombre: "OMNITRIX PROTOTIPO",
      carpeta: "prototipo",
      versiones: [
        "omnitrix_prototipo","cuatrobrazos", "fantasmatico", "fuego", "xlr8", "diamante", "acuatico",
        "insectoide", "bestia", "ultrat", "materiagris", "cannonbolt", "wildvine", "blitzwolfer", "snareoh",
		"frankentrueno", "multiojos", "upchuck", "ditto", "muygrande", "articguana", "spitter"
		
      ],
      descripciones: {
		"omnitrix_prototipo": "OMNITRIX PROTOTIPO",
        "cuatrobrazos": "CUATRO BRAZOS",
        "fantasmatico": "FANTASMÁTICO",
        "fuego": "FUEGO",
        "xlr8": "XLR8",
        "diamante": "DIAMANTE",
        "acuatico": "ACUÁTICO",
        "insectoide": "INSECTOIDE",
        "bestia": "BESTIA",
        "ultrat": "ULTRA T",
        "materiagris": "MATERIA GRIS",
		"cannonbolt": "CANNONBOLT",
		"wildvine": "WILDVINE",
		"blitzwolfer": "BLITZWOLFER",
		"snareoh": "SNARE-OH",
		"frankentrueno": "FRANKENTRUENO",
		"multiojos": "MULTI OJOS",
		"upchuck": "UPCHUCK",
		"ditto": "DITTO",
		"muygrande": "MUY GRANDE",
		"articguana": "ARTICGUANA",
		"spitter": "SPITTER"
      }
    },
    {
      nombre: "OMNITRIX RECALIBRADO",
      carpeta: "recalibrado",
      versiones: [
		"omnitrix_recalibrado",	"fuegopantanoso", "ecoeco", "humungosaurio", "jetray", "frio",
        "cerebron", "monoaraña", "goop", "alienx", "piedra", "rath", "lodestar"
	],
	
      descripciones: {
		"omnitrix_recalibrado": "OMNITRIX RECALIBRADO",
        "fuegopantanoso": "FUEGO PANTANOSO",
        "ecoeco": "ECO ECO",
        "humungosaurio": "HUMUNGOSAURIO",
        "jetray": "JETRAY",
        "frio": "FRÍO",
        "cerebron": "CEREBRON",
        "monoaraña": "MONO ARAÑA",
        "goop": "GOOP",
        "alienx": "ALIEN X",
        "piedra": "PIEDRA",
        "rath": "RATH",
        "lodestar": "LODESTAR"
    
      }
    },
    {
      nombre: "ULTIMATRIX",
      carpeta: "ultimatrix",
      versiones: [
        "ultimatrix","fuegopantanososupremo", "ecoecosupremo", "humungosauriosupremo", "friosupremo",
        "cannonboltsupremo", "monoarañasupremo", "muygrandesupremo", "rathsupremo", "bestiasuprema", 
		"bivalvan", "galapagus", "andreas", "raad", "pandor"
      ],
      descripciones: {
        "ultimatrix": "ULTIMATRIX",
		"fuegopantanososupremo": "FUEGO PANTANOSO SUPREMO",
        "ecoecosupremo": "ECO ECO SUPREMO",
        "humungosauriosupremo": "HUMUNGOSAURIO SUPREMO",
        "friosupremo": "FRÍO SUPREMO",
        "cannonboltsupremo": "CANNONBOLT SUPREMO",
        "monoarañasupremo": "MONO ARAÑA SUPREMO",
        "muygrandesupremo": "MUY GRANDE SUPREMO",
        "rathsupremo": "RATH SUPREMO",
        "bivalvan": "BIVALVAN",
        "galapagus": "GALAPAGUS",
        "andreas": "ANDREAS",
        "raad": "RA'AD",
		"pandor": "P'ANDOR"
      }
    },
	
    {
      nombre: "OMNITRIX DEFINITIVO",
      carpeta: "definitivo",
      versiones: [
        "omnitrix_definitivo", "gravattack", "feedback", "bloxx", "shocksquatch", "kickinhawk",
        "toepick", "astrodactyl", "bullfrag", "atomix", "gutrot",
        "crashhopper", "escarabola", "walkatrout", "molestolvo", "molestache",
        "elpeor", "whampire"
      ],
      descripciones: {
		"omnitrix_definitivo": "OMNITRIX DEFINITIVO",
		"gravattack": "GRAVATTACK",
        "feedback": "FEEDBACK",
        "bloxx": "BLOXX",
        "shocksquatch": "SHOCKSQUATCH",
        "kickinhawk": "KICKIN HAWK",
        "toepick": "TOEPICK",
        "astrodactyl": "ASTRODACTYL",
        "bullfrag": "BULLFRAG",
        "atomix": "ATOMIX",
        "gutrot": "BARRIGOBOT",
        "crashhopper": "CRASHHOPPER",
        "escarabola": "ESCARABOLA",
        "walkatrout": "WALKATROUT",
        "molestolvo": "MOLESTOLVO",
        "molestache": "MOLESTACHE",
        "elpeor": "EL PEOR",
		"whampire":"WHAMPIRE"
      }
    },
    {
      nombre: "OMNITRIX REBOOT",
      carpeta: "reboot",
      versiones: [
        "omnitrix_reboot", "overflow", "gax", "shockrock", "slapback", "surge"
      ],
      descripciones: {
        "omnitrix_reboot": "OMNITRIX REBOOT",
		"overflow": "OVERFLOW",
        "gax": "GAX",
        "shockrock": "SHOCK ROCK",
        "slapback": "SLAPBACK",
        "surge": "SURGE"
      }
    },
    {
      nombre: "NEMETRIX",
      carpeta: "nemetrix",
      versiones: [
        "nemetrix", "crabdozer", "buglizard", "slamworm", "mucilator", "terroranchula",
        "tyrannopedo", "hypnotick", "omnivoracious", "vicetopus", "panuncian"
      ],
      descripciones: {
		"nemetrix": "NEMETRIX",
		"crabdozer": "CRABDOZER",
        "buglizard": "BUGLIZARD",
        "slamworm": "SLAMWORM",
        "mucilator": "MUCILATOR",
        "terroranchula": "TERRORANCHULA",
        "tyrannopedo": "TYRANNOPEDO",
        "hypnotick": "HYPNOTICK",
        "omnivoracious": "OMNIVORACIOUS",
        "vicetopus": "VICETOPUS",
        "panuncian": "PANUNCIAN"
      }
    }
  ];

  let allAliensImages = [];
  let allAliensCaptions = [];

  aliensData.forEach(seccion => {
    const titulo = document.createElement('h2');
    titulo.className = 'personaje-titulo';
    titulo.textContent = seccion.nombre;
    aliensContainer.appendChild(titulo);

    const grid = document.createElement('div');
    grid.className = 'personaje-grid';
    
    seccion.versiones.forEach(id => {
      const ruta = `imagenes/omnitrix/${seccion.carpeta}/${id}.jpg`;
      const descripcion = seccion.descripciones[id] || id.toUpperCase();

      const img = document.createElement('img');
      img.src = ruta;
      img.alt = descripcion;
      img.title = descripcion;
      img.loading = 'lazy';
      
      img.onclick = () => {
        const index = allAliensImages.indexOf(ruta);
        if (index !== -1) openLightboxAliens(index);
      };

      allAliensImages.push(ruta);
      allAliensCaptions.push(descripcion);

      grid.appendChild(img);
    });

    aliensContainer.appendChild(grid);
  });

  window.allAliensImages = allAliensImages;
  window.allAliensCaptions = allAliensCaptions;

  const galleries = {
    comics: {
    // Ya no usamos un array de nombres sin extensión, usamos la ruta completa
    images: [
      'imagenes/comics/portada1',
      'imagenes/comics/portada2.jpg',
      'imagenes/comics/portada3.jpg',
      'imagenes/comics/portada4.jpg',
      'imagenes/comics/portada5.jpg',
      'imagenes/comics/portada6.jpg',
      'imagenes/comics/portada7.jpg'
    ],
    names: {
      'imagenes/comics/portada1': 'CÓMIC 1',
      'imagenes/comics/portada2.jpg': 'CÓMIC 2',
      'imagenes/comics/portada3.jpg': 'CÓMIC 3',
      'imagenes/comics/portada4.jpg': 'CÓMIC 4',
      'imagenes/comics/portada5.jpg': 'CÓMIC 5',
      'imagenes/comics/portada6.jpg': 'CÓMIC 6',
      'imagenes/comics/portada7.jpg': 'CÓMIC 7'
    }
  },
    videojuegos: {
      images: ['alienforce','ben10','cosmicdestruction','galacticracing','omniverse','omniverse2','powertrip','protectorofearth','riseofhex','vilgaxattacks'],
      names: {'alienforce':'ALIEN FORCE','ben10':'BEN 10','cosmicdestruction':'ULTIMATE ALIEN COSMIC DESTRUCTION','galacticracing':'GALACTIC RACING','omniverse':'OMNIVERSE','omniverse2':'OMNIVERSE 2','powertrip':'POWER TRIP','protectorofearth':'PROTECTOR OF EARTH','riseofhex':'RISE OF HEX','vilgaxattacks':'VILGAX ATTACKS'}
    },
    series: {
      images: ['original','fuerza','supremacia','omni','reboot'],
      names: {'original':'SERIE ORIGINAL','fuerza':'FUERZA ALIENÍGENA','supremacia':'SUPREMACÍA ALIENÍGENA','omni':'OMNIVERSE','reboot':'REBOOT'}
    },
    peliculas: {
      images: ['carrera','secretodelomnitrix','destruccionalienigena','invasionalienigena','vsuniverso','alienxtinction','ben10010','bengen10','heroesunidos'],
      names: {'carrera':'BEN 10: CARRERA CONTRA EL TIEMPO','secretodelomnitrix':'BEN 10: SECRETO DEL OMNITRIX','destruccionalienigena':'BEN 10: DESTRUCCIÓN ALIENÍGENA','invasionalienigena':'BEN 10: INVASIÓN ALIENÍGENA','vsuniverso':'BEN 10 VERSUS EL UNIVERSO','alienxtinction':'BEN 10: EXTINCIÓN ALIENÍGENA','ben10010':'BEN 10010','bengen10':'BEN GEN 10','heroesunidos':'BEN 10: HÉROES UNIDOS'}
    }
  };
  
  function getValidImagePath(section, filename) {
  const base = `imagenes/${section}/${filename}`;
  const extensions = ['.png', '.jpg', '.JPG', '.jpeg', '.JPEG'];
  
  for (const ext of extensions) {
    const path = base + ext;
   
    const tester = new Image();
    tester.src = path;
    if (tester.complete && tester.naturalWidth > 0) {
      return path;
    }
  }
  
  return base + '.jpg';
}

  Object.keys(galleries).forEach(section => {
  const grid = document.getElementById(`grid-${section}`);
  if (!grid) return;

  galleries[section].images.forEach((filename, i) => {
    const img = document.createElement('img');
    const ruta = getValidImagePath(section, filename);  

    img.src = ruta;
    img.alt = galleries[section].names[filename] || filename;
    img.title = img.alt;
    img.loading = 'lazy';

    img.style.backgroundImage = `url(${ruta})`;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';
    img.classList.add('blur-background');

    img.onclick = () => openLightbox(section, i);
    grid.appendChild(img);
  });
});

  function updateLightboxBackground(src) {
    if (lightboxWrapper) {
      lightboxWrapper.style.setProperty('--current-img', `url(${src})`);
    }
  }

  function openLightboxPersonajes(index) {
    currentGallery = 'personajes';
    currentIndex = index;
    
    lightboxImg.src = allPersonajesImages[index];
    caption.textContent = allPersonajesCaptions[index];
    
    updateLightboxBackground(allPersonajesImages[index]);
    generateThumbnails(allPersonajesImages, index);
    
    lightbox.style.display = 'flex';
    document.body.classList.add('lightbox-open');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openLightboxAliens(index) {
    currentGallery = 'aliens';
    currentIndex = index;
    
    lightboxImg.src = allAliensImages[index];
    caption.textContent = allAliensCaptions[index];
    
    updateLightboxBackground(allAliensImages[index]);
    generateThumbnails(allAliensImages, index);
    
    lightbox.style.display = 'flex';
    document.body.classList.add('lightbox-open');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
	function openLightbox(section, index) {
  currentGallery = section;
  currentIndex = index;

  let src, cap;

  if (section === 'comics') {
    src = galleries.comics.images[index];
    cap = galleries.comics.names[src];
  } else {
    const filename = galleries[section].images[index];
    src = getValidImagePath(section, filename);
    cap = galleries[section].names[filename];
  }

  lightboxImg.src = src;
  caption.textContent = cap;
  updateLightboxBackground(src);

  const thumbsArray = section === 'comics' 
    ? galleries.comics.images 
    : galleries[section].images.map(f => getValidImagePath(section, f));

  generateThumbnails(thumbsArray, index);

  lightbox.style.display = 'flex';
  document.body.classList.add('lightbox-open');
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

  function generateThumbnails(srcArray, activeIndex) {
    thumbnailStrip.innerHTML = '';
    thumbs = [];
    srcArray.forEach((src, i) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.onclick = () => goToImage(i);
      if (i === activeIndex) thumb.classList.add('active');
      thumbnailStrip.appendChild(thumb);
      thumbs.push(thumb);
    });
  }

  function goToImage(index) {
    currentIndex = index;
    updateImage();
  }

  function updateImage() {
  let src, cap;
  if (currentGallery === 'personajes') {
    src = allPersonajesImages[currentIndex];
    cap = allPersonajesCaptions[currentIndex];
  } else if (currentGallery === 'aliens') {
    src = allAliensImages[currentIndex];
    cap = allAliensCaptions[currentIndex];
  } else {
    const filename = galleries[currentGallery].images[currentIndex];
    src = getValidImagePath(currentGallery, filename);
    cap = galleries[currentGallery].names[filename];
  }

  lightboxImg.src = src;
  caption.textContent = cap;
  updateLightboxBackground(src);
  thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
}

  prevBtn.onclick = () => {
    let len;
    if (currentGallery === 'personajes') len = allPersonajesImages.length;
    else if (currentGallery === 'aliens') len = allAliensImages.length;
    else len = galleries[currentGallery].images.length;
    currentIndex = (currentIndex - 1 + len) % len;
    updateImage();
  };

  nextBtn.onclick = () => {
    let len;
    if (currentGallery === 'personajes') len = allPersonajesImages.length;
    else if (currentGallery === 'aliens') len = allAliensImages.length;
    else len = galleries[currentGallery].images.length;
    currentIndex = (currentIndex + 1) % len;
    updateImage();
  };

  closeBtn.onclick = () => {
    lightbox.style.display = 'none';
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    document.body.style.overflow = 'auto';
  };

  lightbox.onclick = e => { if (e.target === lightbox) closeBtn.click(); };

  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'Escape') closeBtn.click();
    }
  });

});