import { envs } from '@src/config';
import axios from 'axios';

interface GeoLocation {
  city: string | null;
  region: string | null;
  country: string | null;
}

class GeolocationHandler {
  static async get(ip: string): Promise<GeoLocation> {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${envs.IP_INFO_TOKEN}`);
      const data = (await response.data) as GeoLocation;

      return {
        city: data.city || null,
        region: data.region || null,
        country: data.country || null
      };
    } catch (error) {
      console.log('Error fetching geolocation data', error);
      return { city: null, region: null, country: null };
    }
  }
}

export default GeolocationHandler;
