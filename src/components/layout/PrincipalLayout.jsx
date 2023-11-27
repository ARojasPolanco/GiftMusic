import { Link } from "react-router-dom"
import { LogoutIcon, MinimalPlayIcon, PlaylistIcon } from "../shared/Icons"
import { useUserInfo } from "../../store/userInfo"
import { useState } from "react"
import PopUpPlaylist from "../Playlist/PopUpPlaylist"
import { usePlaylistCart } from "../../store/plaulistCart"

const PrincipalLayout = ({ children }) => {
    const [isShowAuthOptions, setIsShowAuthOptions] = useState(false)
    const [isShowCurrentPlaylist, setIsShowCurrentPlaylist] = useState(false)
    const tracks = usePlaylistCart(store => store.tracks)
    const logout = useUserInfo(state => state.logout)

    return (
        <section className="min-h-screen font-urbanist bg-purple-bg text-white bg-[url(/images/bg-auth-mobile.png)] bg-right-bottom bg-no-repeat sm:bg-[url(/images/bg-auth-desktop.png)] overflow-hidden">
            <header className="flex p-2 justify-between items-center bg-purple-dark sm:text-lg relative">
                <Link to={"/"} >
                    <h1 className="uppercase font-semibold">Gift Music</h1>
                </Link>
                <section className="flex gap-4 [&>button]:uppercase [&>button]:border-[1px] [&>button]:py-1 [&>button]:px-2 [&>button]:text-sm [&>button]:rounded-full [&>button]:font-semibold [&>button]:border-yellow-border">
                    <button onClick={() => setIsShowAuthOptions(!isShowAuthOptions)} className="hover:bg-purple-light">Mi cuenta</button>
                    <button onClick={() => setIsShowCurrentPlaylist(!isShowCurrentPlaylist)} className="flex gap-3 sm:gap-2 items-center hover:bg-purple-light">
                        <PlaylistIcon />
                        <span className="hidden sm:inline">Grabando</span>{tracks.length}
                    </button>
                </section>

                <article className={`absolute -bottom-2 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-yellow-border transition-[right] duration-300 ${isShowAuthOptions ? "right-4" : "-right-full"}`}>
                    <Link to={"/playlists"} className="flex gap-2 items-center uppercase font-semibold hover:text-yellow-border group">
                        <MinimalPlayIcon />
                        Mis Grabaciones</Link>
                    <button onClick={logout} className="flex gap-2 items-center uppercase font-semibold hover:text-yellow-border group">
                        <LogoutIcon />
                        Cerrar sesión</button>
                </article>

                <PopUpPlaylist isShowCurrentPlaylist={isShowCurrentPlaylist} />

            </header>
            <section className="flex justify-center items-center pt-10 px-4">
                {children}
            </section>
        </section>
    )
}

export default PrincipalLayout