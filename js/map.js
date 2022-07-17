ymaps.ready(init);

function init() {
  let map = new ymaps.Map('map', {
    center: [55.75010657, 37.59873423],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ['drag'] 
  });

  let coords = [
    [55.75934330, 37.58154921],
    [55.74967750, 37.60345580],
    [55.74305676, 37.58033625],
    [55.75681970, 37.61736485]
  ];

  let collection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: './svg/placemark.svg',
    iconImageSize: [76, 95],
    iconImageOffset: [-38, -47,5],
    draggable: false
  });

  coords.forEach(coord => {
    collection.add(new ymaps.Placemark(coord));
  });

  map.geoObjects.add(collection);
}