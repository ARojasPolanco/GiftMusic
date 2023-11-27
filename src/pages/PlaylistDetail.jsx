import { Link, useNavigate, useParams } from "react-router-dom"
import ContainerMusic from "../components/layout/ContainerMusic"
import { useEffect, useRef, useState } from "react"
import { PincelIcon, SaveIcon, SharedIcon, TrashIcon } from "../components/shared/Icons"
import { axiosMusic } from "../config/axios.config"
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail"

const PlaylistDetail = () => {
    const [isShowSideA, setIsShowSideA] = useState(true)
    const [playlistInfo, setPlaylistInfo] = useState(null)

    const { id } = useParams()
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleDeleteTrackByPlaylist = (idTrackToDelete) => {
        axiosMusic
            .delete(`/api/playlists/${playlistInfo.id}/tracks/${idTrackToDelete}`)
            .then(() => {
                const newTracks = playlistInfo.tracks.filter(track => track.id !== idTrackToDelete)
                setPlaylistInfo({ ...playlistInfo, tracks: newTracks })
            })
            .catch((err) => console.log(err))
    }

    const handleDeletePlaylist = () => {
        axiosMusic.delete(`/api/playlists/${id}`)
            .then(() => {
                navigate("/playlists")
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        axiosMusic
            .patch(`/api/playlists/${id}`, data)
            .then(() => alert("Playlist actualizada correctamente"))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axiosMusic
            .get(`/api/playlists/${id}`)
            .then(({ data }) => setPlaylistInfo(data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (playlistInfo) {
            formRef.current.playlistDetail_title.value = playlistInfo.title
            formRef.current.playlistDetail_to.value = playlistInfo.to
            formRef.current.playlistDetail_message.value = playlistInfo.message
        }
    }, [playlistInfo])



    return (
        <ContainerMusic>
            <Link to={-1} className="mb-4 block hover:text-yellow-border transition-colors">{"<"}Atras</Link>
            <form
                onSubmit={handleSubmit}
                ref={formRef}
                id="formPlaylistCart"
                className={`relative w-[238px] mx-auto card ${isShowSideA ? "sideA" : "sideB"}`}>
                {/* Parte frontal (Lado A)*/}
                <div className="relative front">
                    <img className="mx-auto" src="/images/cassette.png" alt="" />
                    <div className="flex items-center gap-2 bg-white absolute top-4 left-4 rounded-md p-1 px-2 w-[200px] z-30">
                        <input className="text-black bg-transparent outline-none text-sm flex-1"
                            type="text"
                            placeholder="titulo"
                            size={10}
                            name="title"
                            required
                            id="playlistDetail_title"
                            onFocus={() => setIsShowSideA(true)} />
                        <label htmlFor="">
                            <PincelIcon />
                        </label>
                    </div>
                    <Link
                        to={`/playlists/public/${id}`}
                        target="_blank"
                        className="absolute right-5 bottom-4 border-2 rounded-full p-[3px] hover:border-yellow-border group transition-colors">
                        <SharedIcon />
                    </Link>
                    <button
                        type="submit"
                        className="absolute left-5 bottom-4 border-2 rounded-full p-[3px] hover:border-yellow-border group transition-colors">
                        <SaveIcon />
                    </button>
                    <button
                        type="button "
                        onClick={handleDeletePlaylist}
                        className="absolute left-16 bottom-4 border-2 rounded-full p-[3px] hover:border-yellow-border group transition-colors">
                        <TrashIcon />
                    </button>
                </div>

                {/* Parte trasera (Lado B) */}
                <div className="absolute top-0 left-1 back">
                    <img src="/images/cassette.png" alt="" />
                    <div className="flex items-center gap-2 bg-white absolute top-4 left-4 rounded-md px-2 w-[200px]">
                        <input className="text-black bg-transparent outline-none text-sm flex-1"
                            type="text"
                            placeholder="Para:"
                            size={10}
                            name="to"
                            id="playlistDetail_to"
                            required
                            onFocus={() => setIsShowSideA(false)} />
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
                            name="message"
                            id="playlistDetail_message"
                            required
                            onFocus={() => setIsShowSideA(false)} />
                    </div>
                </div>

            </form>
            <button className="max-w-max mx-auto block my-4" onClick={() => setIsShowSideA(!isShowSideA)}>
                {
                    isShowSideA ? "Lado B" : "Lado A"
                }
            </button>
            <ListPlaylistDetail tracks={playlistInfo?.tracks ?? []}
                handleDeleteTrackByPlaylist={handleDeleteTrackByPlaylist}
                showDeleteBtn />
        </ContainerMusic >
    )
}

export default PlaylistDetail