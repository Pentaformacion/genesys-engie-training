function generarCaso(tipo){

    if(advisorSelected === ""){

        alert(
            "Selecciona un asesor"
        );

        return;
    }

    const caso = {

        asesor: advisorSelected,

        cliente: "Zoe Nolasco",

        cuenta: "ENG-458921",

        tipo: tipo,

        mensaje:
        "Hola, necesito ayuda con mi factura.",

        estado: "nuevo",

        fecha: new Date()

    };

    db.collection("cases")
    .add(caso)

.then(()=>{

    document.getElementById(
    "monitor-container"
    ).innerHTML = `

    <div style="padding:20px;">

        <h2>
        ${advisorSelected}
        </h2>

        <p>
        Caso enviado:
        ${tipo}
        </p>

    </div>

    `;

});

}
