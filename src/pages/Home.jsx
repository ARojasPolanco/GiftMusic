import { useEffect, useState } from "react"
import ContainerMusic from "../components/layout/ContainerMusic"
import { SeachIcon } from "../components/shared/Icons"
import { axiosMusic } from "../config/axios.config"
import ListTracksDefault from "../components/shared/ListTracksDefault"

const Home = () => {
    const [tracksRecomendations, setTracksRecomendations] = useState([])
    const [trackResults, setTrackResults] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const query = e.target["home-querySearch"].value
        if (query === "") return setTrackResults([])
        axiosMusic
            .get(`/api/tracks?limit=10&q=${query}`)
            .then(({ data }) => setTrackResults(data.tracks.items))
            .catch((err) => console.log(err))
    }

    const tracksToShow = trackResults.length === 0 ? tracksRecomendations : trackResults

    useEffect(() => {
        axiosMusic
            .get("/api/tracks/recommendations?seed_genres=latino,pop,reggaeton,reggae,rock-n-roll")
            .then(({ data }) => setTracksRecomendations(data.tracks))
            .catch((err) => console.log(err))
    }, [])

    return (
        <ContainerMusic>
            <header className="text-lg">
                <form onSubmit={handleSubmit} className="bg-purple-dark p-2 rounded-md flex gap-2 items-center">
                    <button>
                        <SeachIcon />
                    </button>
                    <input
                        id="home-querySearch"
                        className="bg-transparent flex-1 outline-none"
                        type="text"
                        size={10}
                        autoComplete="off"
                        placeholder="Buscar" />
                    <select className="bg-transparent outline-none">
                        <option value="10">10</option>
                    </select>
                </form>
            </header>
            <ListTracksDefault tracks={tracksToShow} />
        </ContainerMusic>
    )
}

export default Home