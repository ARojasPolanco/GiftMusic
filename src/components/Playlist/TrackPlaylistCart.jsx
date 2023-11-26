import { Link } from "react-router-dom"
import { DeleteIcon } from "../shared/Icons"
import { usePlaylistCart } from "../../store/plaulistCart"

const TrackPlaylistCart = ({ track }) => {
    const deleteTrack = usePlaylistCart(store => store.deleteTrack)
    return (
        <article key={track.id} className="flex items-center gap-2 hover:bg-white/20 p-1 rounded-md pr-2 transition-colors">
            <header className="rounded-md overflow-hidden w-[45px]">
                <img src={track.album.images[2].url} alt="" />
            </header>
            <section className="flex-1">
                <Link to={`/tracks/${track.id}`} className="font-semibold line-clamp-1">{track.name}</Link>
                <Link to={`/artists/${track.artists[0].id}`} className="text-slate-300 text-xs font-light line-clamp-1">{track.artists[0].name}</Link>
            </section>
            <section className="flex items-center gap-2">
                <button onClick={() => deleteTrack(track.id)} className="group">
                    <DeleteIcon />
                </button>
            </section>
        </article>
    )
}

export default TrackPlaylistCart