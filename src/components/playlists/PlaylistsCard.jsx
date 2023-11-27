import { Link } from "react-router-dom"
import { PincelIcon } from "../shared/Icons"


const PlaylistsCard = ({ playlist, index }) => {

    const topDistance = index * 54

    return (
        <Link
            to={`/playlists/${playlist.id}`}
            className="absolute front transition-transform cursor-pointer hover:rotate-2 hover:-translate-y-4" style={{ top: `${topDistance}px` }}>
            <img className="mx-auto" src="/images/cassette.png" alt="" />
            <div className="flex items-center gap-2 bg-white absolute top-4 left-5 rounded-md p-[3px] px-2 w-[199px]">
                <h3 className="text-black flex-1 line-clamp-1">{playlist.title}</h3>
                <PincelIcon />
            </div>
        </Link>
    )
}

export default PlaylistsCard