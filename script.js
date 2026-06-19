// Constante ya ordenada alfabéticamente de la A a la Z
const equipos = [
    "Alemania", "Arabia Saudita", "Argelia", "Argentina", "Australia", "Austria", 
    "Bélgica", "Bosnia y Herzegovina", "Brasil", "Cabo Verde", "Canadá", "Colombia", 
    "Costa de Marfil", "Croacia", "Curazao", "Ecuador", "Egipto", "Escocia", "España", 
    "Estados Unidos", "Francia", "Ghana", "Haití", "Inglaterra", "Irak", "Japón", 
    "Jordania", "Marruecos", "México", "Noruega", "Nueva Zelanda", "Panamá", 
    "Paraguay", "Países Bajos", "Portugal", "Qatar", "RD Congo", "RI de Irán", 
    "República Checa", "República de Corea", "Senegal", "Sudáfrica", "Suecia", 
    "Suiza", "Turquía", "Túnez", "Uruguay", "Uzbekistán"
];

const ratings = {
    "Argentina": 5, "Francia": 5, "Brasil": 5, "España": 5, "Inglaterra": 5,
    "Alemania": 4, "Países Bajos": 4, "Portugal": 4, "Uruguay": 4, "Bélgica": 4, "Croacia": 4, "Colombia": 4,
    "México": 3, "Suiza": 3, "Senegal": 3, "Ecuador": 3, "Japón": 3, "Marruecos": 3, "Suecia": 3, 
    "República Checa": 3, "Austria": 3, "Turquía": 3, "Estados Unidos": 3, "República de Corea": 3,
    "Argelia": 2, "Escocia": 2, "Costa de Marfil": 2, "Ghana": 2, "RI de Irán": 2, "Noruega": 2, 
    "Australia": 2, "Paraguay": 2, "Canadá": 2, "Egipto": 2, "Bosnia y Herzegovina": 2,
    "Túnez": 1, "Arabia Saudita": 1, "Uzbekistán": 1, "Sudáfrica": 1, "Panamá": 1, "Nueva Zelanda": 1, 
    "Irak": 1, "Jordania": 1, "RD Congo": 1, "Cabo Verde": 1, "Haití": 1, "Curazao": 1, "Qatar": 1
};

document.addEventListener("DOMContentLoaded", () => {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    
    // Ordenamos alfabéticamente
    const equiposOrdenados = [...equipos].sort((a, b) => a.localeCompare(b, 'es'));
    
    equiposOrdenados.forEach(eq => {
        let opt1 = document.createElement('option');
        opt1.value = eq;
        opt1.innerHTML = eq;
        p1.appendChild(opt1);
        
        let opt2 = document.createElement('option');
        opt2.value = eq;
        opt2.innerHTML = eq;
        p2.appendChild(opt2);
    });
});

function calcularPrediccion() {
    const p1 = document.getElementById('p1').value;
    const p2 = document.getElementById('p2').value;
    const resDiv = document.getElementById('resultado');

    if (!equipos.includes(p1) || !equipos.includes(p2)) {
        resDiv.innerHTML = "<p style='color:red;'>Asegurate de elegir dos equipos válidos de la lista.</p>";
        return;
    }

    if (p1 === p2) {
        resDiv.innerHTML = "<p style='color:red;'>Elegí equipos distintos.</p>";
        return;
    }

    const r1 = ratings[p1] || 1;
    const r2 = ratings[p2] || 1;
    let diff = r1 - r2;
    
    let esEmpate = false;
    let ganador, perdedor, ganadorDesempate;

    if (diff > 0) {
        ganador = p1;
        perdedor = p2;
    } else if (diff < 0) {
        ganador = p2;
        perdedor = p1;
    } else {
        esEmpate = true;
        // Definimos un ganador de desempate por orden alfabético
        ganadorDesempate = p1.localeCompare(p2, 'es') < 0 ? p1 : p2;
    }

    const abs = Math.abs(diff);

    // Los nombres de los países ahora se imprimen exactamente como están en la constante (Inicial mayúscula)
    if (esEmpate) {
        resDiv.innerHTML = `
            <div class="result-card">
                <strong>EMPATE TÉCNICO</strong><br>
                <div class="score-item res-verde">${p1} 1 ${p2} 1 <span class="etiqueta-prob">más probable</span></div>
                <div class="score-item res-amarillo">${p1} 0 ${p2} 0 <span class="etiqueta-prob">probable</span></div>
                <div class="score-item res-naranja">${p1} 2 ${p2} 2 <span class="etiqueta-prob">poco probable</span></div>
                <div class="score-item" style="color: #666; font-size: 0.9em; font-weight: normal; margin-top: 10px; border-top: 1px solid #eaeaea; padding-top: 10px;">
                    <em>Aclaración: Ante un desempate definitivo, ganaría ${ganadorDesempate}.</em>
                </div>
            </div>
        `;
    } else {
        resDiv.innerHTML = `
            <div class="result-card">
                <strong>GANADOR <span class="res-rojo">${ganador}</span> <span class="res-verde">+${abs}</span></strong><br>
                <div class="score-item res-verde">${ganador} ${abs} ${perdedor} 0 <span class="etiqueta-prob">más probable</span></div>
                <div class="score-item res-amarillo">${ganador} ${abs + 1} ${perdedor} 1 <span class="etiqueta-prob">probable</span></div>
                <div class="score-item res-naranja">${ganador} ${abs + 2} ${perdedor} 2 <span class="etiqueta-prob">poco probable</span></div>
            </div>
        `;
    }
}