ymaps.ready(init);

function init() {
  let map;

  if (isMobile) {
    map = new ymaps.Map('map', {
      center: [55.75010657, 37.59873423],
      zoom: 13,
      controls: ['zoomControl'],
      behaviors: ['drag'] 
    });
  } else {
    map = new ymaps.Map('map', {
      center: [55.75010657, 37.59873423],
      zoom: 14,
      controls: ['zoomControl'],
      behaviors: ['drag'] 
    });
  }

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
      address: 'Кудринская площадь, 1'
    },
    {
      coords: [55.74940456899021,37.60237299999997],
      address: 'ул. Знаменка, 19с3'
    },
    {
      coords: [55.74298506900349,37.58114549999996],
      address: 'Ружейный переулок, 3'
    },
    {
      coords: [55.757131068980215,37.61711450000001],
      address: 'ул. Охотный ряд, 2'
    },
  ];

  function setPlacemark(coord, address, width, height) {
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
                            <div class="balloon__address">${address}</div>
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
        iconImageSize: [width, height],
        iconImageOffset: [-(width/2), -(height)],
        draggable: false
      }
    )
    return placemark;
  }
  
  if (isMobile) {
    for (let i=0; i<placemarks.length; i++) {
      geoObjects.push(setPlacemark(placemarks[i].coords, placemarks[i].address, 43, 55));
    }
  } else {
    for (let i=0; i<placemarks.length; i++) {
      geoObjects.push(setPlacemark(placemarks[i].coords, placemarks[i].address, 58, 73));
    }
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