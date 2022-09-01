window.addEventListener("load", () => {
    let $selectProvincias = document.querySelector("#provincias");
    let $selectLocalidades = document.querySelector("#localidades");

    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then((response) => response.json())
    .then((data) => {
        for (let index = 0; index < data.provincias.length; index++) {
            $selectProvincias.innerHTML += `<option value="${data.provincias[index].id}">${data.provincias[index].nombre}</option>`
        }
    })



    .catch((error) => console.log(error))

    $selectProvincias.addEventListener("change", (event) => {
        let idProvincia = event.target.value;
        $selectLocalidades.innerHTML = `<option value="" hidden selected>Localidades</option>`

        fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&campos=id,nombre&max=5000`)
        .then((response) => response.json())
        .then((data) => {
            data.localidades.forEach(localidad => {
                $selectLocalidades.innerHTML += `<option value="${localidad.id}">${localidad.nombre}</option>`
            });
        })
        .catch((error) => console.log(error))

    })})