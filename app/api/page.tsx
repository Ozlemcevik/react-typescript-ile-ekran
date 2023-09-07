import SearchBar from '@/components/SearchBar';
import axios from 'axios';


export default async function Home() {
  async function getIller() {
    const r = await axios.get(`${process.env.MS_URL}/api/iller`);
    return await r.data;
  }

  const cities = await getIller()

  return (
    <main>
      <SearchBar cities={cities} />
    </main>
  )
}
