ymaps.ready(init);

function init() {
  let map = new ymaps.Map('map', {
    center: [55.75010657, 37.59873423],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ['drag'] 
  });

  // let coords = [
  //   [55.7589644348603,37.58109490130086],
  //   [55.74940456899021,37.60237299999997],
  //   [55.74298506900349,37.58114549999996],
  //   [55.757131068980215,37.61711450000001]
  // ];

  let geoObjects = [];
  let placemarks = [
    {
      coords: [55.7589644348603,37.58109490130086],
      adress: 'Кудринская площадь, 1'
    },
    {
      coords: [55.74940456899021,37.60237299999997],
      adress: 'ул. Знаменка, 19с3'
    },
    {
      coords: [55.74298506900349,37.58114549999996],
      adress: 'Ружейный переулок, 3'
    },
    {
      coords: [55.757131068980215,37.61711450000001],
      adress: 'ул. Охотный ряд, 2'
    },
  ];

  function setPlacemark(coord, adress) {
    let placemark = new ymaps.Placemark(coord,
      {
        balloonContent: `<div class="contacts__balloon balloon">
                          <div class="balloon__icon">
                            <svg class="balloon__pic">
                              <use xlink:href="svg/sprite.svg#logo"></use>
                            </svg>
                          </div>
                          <div class="balloon__row">
                            <div class="balloon__description"><span>Beats.</span> Адрес магазина:</div>
                            <div class="balloon__address">${adress}</div>
                            <div class="baloon__workhours">
                              <div class="baloon__workhours-title"><span>Режим работы:</span></div>  
                              <div class="baloon__workhours-hours">пн-вс: 10.00 - 19.00</div>  
                            </div>
                          </div>
                        </div>`
      }, 
      {
        iconLayout: 'default#image',
        iconImageHref: './svg/placemark.svg',
        iconImageSize: [58, 73],
        iconImageOffset: [-29, -73],
        draggable: false
      }
    )
    return placemark;
  }

  for (let i=0; i<placemarks.length; i++) {
    geoObjects.push(setPlacemark(placemarks[i].coords, placemarks[i].adress));
  }

  let clusterer = new ymaps.Clusterer({
    clusterIcons: [{
      href: './svg/cluster.svg',
      size: [60, 60],
      offset: [-30, -30]
    }],
    clusterIconContentLayout: false
  });

  clusterer.add(geoObjects);
  map.geoObjects.add(clusterer);
}