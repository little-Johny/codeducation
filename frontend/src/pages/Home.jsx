export default function Home() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6">
            <div className="absolute -z-10 top-10 left-10 h-24 w-24 rounded-full bg-orange-400/60 blur-2xl" />
            <div className="absolute -z-10 bottom-16 right-24 h-28 w-28 rounded-full bg-orange-300/50 blur-2xl" />
            <div className="grid grid-cols-5 w-full max-w-5xl  rounded-xl bg-white  shadow-2xl overflow-hidden ">
                {/* Izquierda */}
                <div className="col-span-2 p-8  h-full w-full">
                  <h1 className="text-2xl font-bold">Login</h1>
                  <form action="">

                  </form>

                </div>
                {/* Derecha */}
                <div className="col-span-3 p-8 bg-amber-600 h-full w-full">Adios</div>
            </div>
        </div>
    );
}
