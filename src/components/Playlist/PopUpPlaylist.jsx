import { useState } from "react"
import { PincelIcon } from "../shared/Icons"
import "./PopUpPlaylist.css"
import ListCartPlaylist from "./ListCartPlaylist"
import { usePlaylistCart } from "../../store/plaulistCart"
import { axiosMusic } from "../../config/axios.config"

const PopUpPlaylist = ({ isShowCurrentPlaylist }) => {
    const [isShowSideA, setIsShowSideA] = useState(true)
    const tracks = usePlaylistCart(store => store.tracks)
    const cleanTracks = usePlaylistCart(store => store.cleanTracks)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        data.tracks = tracks

        axiosMusic
            .post("/api/playlists", data)
            .then(() => {
                e.target.reset()
                cleanTracks()
            })
            .catch((err) => console.log(err))
    }

    return (
        <article className={`absolute w-[271.6px] -bottom-2 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-yellow-border transition-[right] duration-300 ${isShowCurrentPlaylist ? "right-4" : "-right-full"}`}>
            <form
                id="formPlaylistCart"
                onSubmit={handleSubmit}
                className={`relative card ${isShowSideA ? "sideA" : "sideB"}`}>
                {/* Parte frontal (Lado A)*/}
                <div className="relative front">
                    <img className="mx-auto" src="/images/cassette.png" alt="" />
                    <div className="flex items-center gap-2 bg-white absolute top-4 left-4 rounded-md px-2 w-[200px]">
                        <input className="text-black bg-transparent outline-none text-sm flex-1"
                            type="text"
                            placeholder="titulo"
                            size={10}
                            name="title" />
                        <label htmlFor="">
                            <PincelIcon />
                        </label>
                    </div>
                </div>

                {/* Parte trasera (Lado B) */}
                <div className="absolute top-0 left-1 back">
                    <img src="/images/cassette.png" alt="" />
                    <div className="flex items-center gap-2 bg-white absolute top-4 left-4 rounded-md px-2 w-[200px]">
                        <input className="text-black bg-transparent outline-none text-sm flex-1"
                            type="text"
                            placeholder="Para:"
                            size={10}
                            name="to" />
                        <label htmlFor="">
                            <PincelIcon />
                        </label>
                    </div>
                    <div className="flex items-center gap-2 bg-white absolute top-12 left-4 rounded-md px-2 w-[200px]">
                        <textarea className="text-black bg-transparent outline-none text-sm flex-1 resize-none"
                            rows={4}
                            type="text"
                            placeholder="Dedicatoria"
                            size={10}
                            name="message" />
                    </div>
                </div>

            </form>
            <button onClick={() => setIsShowSideA(!isShowSideA)}>
                {
                    isShowSideA ? "Lado B" : "Lado A"
                }
            </button>
            <section>
                <ListCartPlaylist tracks={tracks} />
            </section>
            <button form="formPlaylistCart">Crear</button>
        </article>
    )
}

export default PopUpPlaylist