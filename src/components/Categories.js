
export default function Categories() {
    function ListItem ({title}){
        return(
            <li className="border-yellow-400 border-2 rounded py-2 px-7 mr-2 mb-2">{title}</li>
        )
    }
    return(
        <section className="bg-white" >
            <div className="z-20 pt-3 text-xl container mx-auto pb-6 mb-6">
                <h1 className="text-3xl font-light">Vores mest populære kategorier</h1>
                <ul className="mt-4 flex flex-row flex-wrap w-4/5">
                    <ListItem title="Sav" />
                    <ListItem title="Hammer" />
                    <ListItem title="Trailer" />
                    <a href="#" className="text-base mt-auto mb-2 text-purple-600">Se alle kategorier...</a>
                </ul>
            </div>
        </section>
    )
}

