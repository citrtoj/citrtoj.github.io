const tileURL = "https://tile.openstreetmap.org/${z}/${x}/${y}.png";
const map = L.map('manelemap').setView([45, 12], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

for(let i = 0 ; i < json.manele.length ; i++)
{
    var goldIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
    var marker = L.marker([json.manele[i].lat,json.manele[i].long], {icon: goldIcon}).addTo(map);
    marker.bindPopup(`<iframe style="border-radius:12px" src="${json.manele[i].src}" width=100% height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`);
}   
map.closePopup();