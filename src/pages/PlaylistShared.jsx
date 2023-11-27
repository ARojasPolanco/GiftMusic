import PublicLayout from "../components/layout/PublicLayout"
import ContainerMusic from "../components/layout/ContainerMusic"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosMusic } from "../config/axios.config"
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail"
import { AddIcon, SharedIcon } from "../components/shared/Icons"
import EmbedTrack from "../components/shared/EmbedTrack"

const PlaylistShared = () => {
    const [isShowSideA, setIsShowSideA] = useState(true)
    const [playlistInfo, setPlaylistInfo] = useState(null)
    const [currentTrack, setCurrentTrack] = useState(null)

    const { id } = useParams()
    const formRef = useRef(null)

    const handleCopyUrl = () => {
        const actualUrl = window.location.href
        navigator.clipboard.writeText(actualUrl)
            .then(() => alert("Copiado"))
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
        <PublicLayout>
            <ContainerMusic>
                <form
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
                                id="playlistDetail_title"
                                disabled
                            />
                        </div>
                        <button
                            type="button"
                            className="absolute right-14 bottom-4 border-2 rounded-full p-[4px] hover:border-yellow-border group transition-colors">
                            <AddIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleCopyUrl}
                            target="_blank"
                            className="absolute right-5 bottom-4 border-2 rounded-full p-[3px] hover:border-yellow-border group transition-colors">
                            <SharedIcon />
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
                                disabled
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-white absolute top-12 left-4 rounded-md px-2 w-[200px]">
                            <textarea className="text-black bg-transparent outline-none text-sm flex-1 resize-none"
                                rows={4}
                                type="text"
                                placeholder="Dedicatoria"
                                size={10}
                                name="message"
                                id="playlistDetail_message"
                                disabled
                            />
                        </div>
                    </div>
                </form>
                <button className="max-w-max mx-auto block my-4" onClick={() => setIsShowSideA(!isShowSideA)}>
                    {
                        isShowSideA ? "Lado B" : "Lado A"
                    }
                </button>
                {
                    currentTrack && <EmbedTrack trackId={currentTrack} />
                }
                <ListPlaylistDetail setCurrentTrack={setCurrentTrack} tracks={playlistInfo?.tracks ?? []}
                    showPlayBtn />
            </ContainerMusic>

        </PublicLayout>
    )
}

export default PlaylistShared