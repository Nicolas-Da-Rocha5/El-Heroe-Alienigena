const iconoheader = document.querySelector('.iconoheader');
const barralateral = document.querySelector('.barralateral');
const oscurecido = document.querySelector('.oscurecido');
const menudesplegable = document.querySelector('.menudesplegable');
const submenu = document.querySelector('.submenu');

iconoheader.addEventListener('click', () => {
  barralateral.classList.toggle('barralateral-abierta'); // Se abre la Barra Lateral al clickear el ícono
  oscurecido.classList.toggle('abierto'); // Se oscurece el contenenido

  if (barralateral.classList.contains('barralateral-abierta')) {
    iconoheader.setAttribute('name', 'close-outline'); // Al estar la Barra Lateral abierta, el ícono pasa a ser un ícono de cerrar
    document.body.classList.add('sidebar-activo'); // La Barra Lateral aparece con sus estilos estando abierta
  } 
  
  else {
    iconoheader.setAttribute('name', 'menu-outline'); // Si la Barra Lateral no está abierta o es cerrada, el ícono vuelve a la normalidad
    document.body.classList.remove('sidebar-activo'); // Se desactiva la Barra Lateral y deja de aparecer
    submenu.classList.remove('abierto'); // Se desactiva el Submenú y deja de aparecer
    menudesplegable.classList.remove('activo'); // El apartado del Menú Desplegable se desactiva y deja de aparecer
  }
  
});

menudesplegable.addEventListener('click', (e) => {
  e.preventDefault();
  submenu.classList.toggle('abierto'); // Si se clickea el Menú Desplegable, aparece el Submenú
  menudesplegable.classList.toggle('activo'); // El Menú Desplegable toma sus estilos de estando activo
});

oscurecido.addEventListener('click', () => { // Al clickear el ícono de cerrado...
  barralateral.classList.remove('barralateral-abierta'); // Desaparecen los estilos de la Barra Lateral Abierta
  oscurecido.classList.remove('abierto'); // Desaparece el oscurecido y el contenido pasa a ocupar toda la pantalla de vuelta
  iconoheader.setAttribute('name', 'menu-outline'); // El ícono vuelve a la normalidad
  document.body.classList.remove('sidebar-activo'); // La Barra Lateral Activa desaparece
  submenu.classList.remove('abierto'); // El Submenú desaparece
  menudesplegable.classList.remove('activo'); // El Menú Desplegable desaparece
});
