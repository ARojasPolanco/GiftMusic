import { Link, useNavigate } from "react-router-dom"
import registerHeader from "../../public/images/register-header.png"
import ContainerAuth from "../components/layout/ContainerAuth"
import { axiosMusic } from "../config/axios.config"

const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data)
        axiosMusic
            .post("/api/auth/register", data)
            .then(() => {
                alert("Usuario creado correctamente, ahora ingresa tus datos para comenzar");
                navigate("/auth/login")
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    alert("Usuario o correo electrónico ya en uso");
                } else {
                    console.error(error);
                }
            })
    }

    return (
        <ContainerAuth>
            <header className="hidden sm:block sm:max-w-[350px]">
                <img className="rounded-3xl" src={registerHeader} alt="" />
            </header>

            <form onSubmit={handleSubmit} className="grid gap-6 w-[min(100%,_350px)] sm:w-[300px]">
                <h2 className="uppercase text-4xl font-semibold">Cuenta nueva</h2>
                <div className="grid gap-4">
                    <label className="text-white/50" htmlFor="email">Correo</label>
                    <input className="bg-transparent outline-none border-b border-yellow-border p-1" autoComplete="off" id="email" type="email" name="email" />
                </div>
                <div className="grid gap-4">
                    <label className="text-white/50" htmlFor="name">Nombre de usuario</label>
                    <input className="bg-transparent outline-none border-b border-yellow-border p-1" autoComplete="off" id="name" type="text" name="name" />
                </div>
                <div className="grid gap-4">
                    <label className="text-white/50" htmlFor="password">Constraseña</label>
                    <input className="bg-transparent outline-none border-b border-yellow-border p-1" autoComplete="off" id="password" type="password" name="password" />
                </div>

                <button className="bg-purple-light uppercase font-semibold max-w-max mx-auto px-6 py-1 rounded-full">Crear</button>

                <Link className="text-center underline" to={"/auth/login"}>O iniciar sesión</Link>
            </form>
        </ContainerAuth>
    )
}

export default Register