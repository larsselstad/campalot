const sitesKey = 'sites';
const sites = [{
    coor: {
        x: 50,
        y: 100
    },
    coordinates: '60°24’12,2”N | 22°10’26.5”E',
    navn: 'Stortinden',
    imgs: [
        "/gfx/IMG_8412.JPG"
    ],
    rating: 4
}];

const trips = [];

export default {
    addSite: (site) => {
        sites.push(site);
    },
    getSites: () => {
        return sites;
    },
    changeSite: (oldSite, newSite) => {
        const siteIndex = sites.findIndex(s => oldSite.navn === s.navn);

        sites[siteIndex] = newSite;
    },
    addTrip: (trip) => {
        trips.push(trip);
    },
    getTrips: () => {
        return trips;
    }
};
