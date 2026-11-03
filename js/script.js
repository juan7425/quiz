const contenedor = document.getElementById("recetas");


const cocinas = { Italian: "Italiana", Asian: "Asiática" };
const dificultades = { Easy: "Fácil", Medium: "Media", Hard: "Difícil" };
const pasos = {
    "Preheat the oven to 475°F (245°C).": "Precalentar el horno a 245 °C (475 °F)."
};


fetch("https://dummyjson.com/recipes?limit=1")
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error("No fue posible obtener la receta.");
        }
        return respuesta.json();
    })
    .then((datos) => {
        const receta = datos.recipes[0];
        const primerPaso = receta.instructions[0];

        contenedor.innerHTML = `
            <article class="receta">
                <img src="${receta.image}" alt="${receta.name}">
                <div class="detalles">
                    <h3>${receta.name}</h3>
                    <p><strong>Tipo de cocina:</strong> ${cocinas[receta.cuisine] || receta.cuisine}</p>
                    <p><strong>Dificultad:</strong> ${dificultades[receta.difficulty] || receta.difficulty}</p>
                    <p><strong>Tiempo de preparación:</strong> ${receta.prepTimeMinutes} minutos</p>
                    <p><strong>Primer paso:</strong> ${pasos[primerPaso] || primerPaso}</p>
                </div>
            </article>
        `;
    })
    .catch((error) => {
        contenedor.innerHTML = '<p class="error">No se pudo cargar la receta. Intenta nuevamente.</p>';
        console.error(error);
    });
