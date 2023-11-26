import { Link, useNavigate } from "react-router-dom"
import ContainerAuth from "../components/layout/ContainerAuth"
import loginHeader from "../../public/images/login-header.png"
import { axiosMusic } from "../config/axios.config.js"
import { useUserInfo } from "../store/userInfo.js"

const Login = () => {
    const login = useUserInfo(state => state.login)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        axiosMusic
            .post("/api/auth/login", data)
            .then(({ data }) => {
                login(data)
                navigate("/")
            })
            .catch((err) => console.log(err))
    }

    return (
        <ContainerAuth>
            <header className="hidden sm:block sm:max-w-[350px]">
                <img className="rounded-3xl" src={loginHeader} alt="" />
            </header>

            <form onSubmit={handleSubmit} className="grid gap-6 w-[min(100%,_350px)] sm:w-[300px]">
                <h2 className="uppercase text-4xl font-semibold">Iniciar Sesión</h2>
                <div className="grid gap-4">
                    <label className="text-white/50" htmlFor="email">Correo</label>
                    <input className="bg-transparent outline-none border-b border-yellow-border p-1" autoComplete="off"
                        id="email"
                        type="email"
                        name="email" />
                </div>
                <div className="grid gap-4">
                    <label className="text-white/50" htmlFor="password">Constraseña</label>
                    <input className="bg-transparent outline-none border-b border-yellow-border p-1" autoComplete="off"
                        id="password"
                        type="password"
                        name="password" />
                </div>

                <button className="bg-purple-light uppercase font-semibold max-w-max mx-auto px-6 py-1 rounded-full">Entrar</button>

                <Link className="text-center underline" to={"/auth/register"}>O crear una cuenta nueva</Link>
            </form>
        </ContainerAuth>
    )
}

export default Login