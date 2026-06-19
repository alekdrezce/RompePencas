// script.js - Simulador WC 2026 - Versión Motor Dinámico por Diferencias

const equipos = [
    "Alemania", "Arabia Saudita", "Argelia", "Argentina", "Australia", "Austria", 
    "Bélgica", "Bosnia y Herzegovina", "Brasil", "Cabo Verde", "Canadá", "Colombia", 
    "Corea del Sur", "Costa de Marfil", "Croacia", "Curazao", "Ecuador", "Egipto", "Escocia", "España", 
    "Estados Unidos", "Francia", "Ghana", "Haití", "Inglaterra", "Irak", "Irán", "Japón", 
    "Jordania", "Marruecos", "México", "Noruega", "Nueva Zelanda", "Panamá", 
    "Paraguay", "Países Bajos", "Portugal", "Qatar", "RD Congo", 
    "República Checa", "Senegal", "Sudáfrica", "Suecia", "Suiza", "Turquía", "Túnez", "Uruguay", "Uzbekistán"
];

// Matriz de 10 factores (Escala 1-10):
// [Histórico, Figura, Titulares, Banco, Táctica, DT, Racha, Físico, Pelota Parada, Psicología]
const dbEquipos = {
    "Alemania": [10, 9, 9, 8, 9, 9, 9, 8, 8, 9],
    "Arabia Saudita": [4, 6, 6, 6, 6, 6, 6, 7, 6, 6],
    "Argelia": [5, 7, 7, 6, 6, 7, 6, 7, 7, 6],
    "Argentina": [10, 10, 9, 9, 9, 10, 9, 8, 8, 10],
    "Australia": [5, 6, 6, 6, 7, 7, 7, 8, 7, 7],
    "Austria": [5, 7, 8, 7, 8, 8, 8, 8, 7, 7],
    "Bélgica": [7, 8, 8, 8, 7, 7, 7, 8, 8, 7],
    "Bosnia y Herzegovina": [4, 7, 6, 6, 6, 6, 6, 7, 7, 6],
    "Brasil": [10, 9, 9, 8, 8, 8, 8, 8, 8, 8],
    "Cabo Verde": [2, 6, 6, 5, 6, 5, 6, 7, 6, 5],
    "Canadá": [4, 7, 6, 6, 7, 7, 7, 8, 6, 6],
    "Colombia": [6, 8, 8, 7, 8, 8, 9, 8, 8, 8],
    "Corea del Sur": [6, 8, 7, 6, 7, 7, 7, 8, 7, 7],
    "Costa de Marfil": [5, 7, 7, 7, 6, 7, 7, 8, 7, 6],
    "Croacia": [7, 8, 8, 7, 8, 9, 7, 8, 7, 9],
    "Curazao": [2, 5, 5, 4, 5, 4, 5, 6, 5, 5],
    "Ecuador": [5, 7, 7, 7, 8, 7, 8, 9, 7, 7],
    "Egipto": [5, 8, 6, 6, 6, 7, 6, 7, 7, 6],
    "Escocia": [5, 7, 7, 6, 7, 7, 7, 8, 8, 7],
    "España": [9, 9, 9, 9, 9, 8, 9, 8, 8, 9],
    "Estados Unidos": [6, 7, 7, 7, 7, 7, 7, 8, 8, 7],
    "Francia": [10, 10, 10, 9, 9, 10, 9, 8, 9, 9],
    "Ghana": [5, 7, 7, 6, 6, 7, 6, 8, 7, 6],
    "Haití": [2, 5, 5, 4, 5, 4, 5, 6, 5, 5],
    "Inglaterra": [9, 9, 9, 9, 8, 8, 8, 8, 9, 8],
    "Irak": [3, 5, 5, 5, 5, 5, 6, 6, 6, 5],
    "Irán": [5, 7, 6, 6, 7, 7, 7, 8, 7, 7],
    "Japón": [6, 7, 7, 7, 8, 8, 8, 8, 7, 8],
    "Jordania": [3, 5, 5, 5, 5, 5, 6, 6, 5, 5],
    "Marruecos": [6, 8, 8, 7, 8, 8, 8, 8, 7, 8],
    "México": [7, 7, 7, 7, 7, 7, 6, 8, 7, 7],
    "Noruega": [4, 9, 7, 6, 6, 6, 6, 8, 7, 6],
    "Nueva Zelanda": [3, 5, 5, 5, 5, 5, 5, 7, 6, 5],
    "Panamá": [3, 6, 6, 5, 6, 6, 6, 7, 6, 6],
    "Paraguay": [6, 6, 6, 6, 7, 7, 6, 8, 8, 7],
    "Países Bajos": [8, 8, 9, 8, 8, 8, 8, 8, 8, 8],
    "Portugal": [8, 9, 9, 9, 8, 8, 8, 8, 8, 8],
    "Qatar": [3, 6, 5, 5, 5, 5, 5, 6, 5, 5],
    "RD Congo": [3, 6, 6, 5, 5, 5, 6, 7, 6, 5],
    "República Checa": [6, 7, 7, 6, 7, 7, 7, 8, 8, 7],
    "Senegal": [5, 8, 7, 7, 7, 8, 7, 8, 7, 7],
    "Sudáfrica": [4, 6, 6, 6, 6, 6, 6, 7, 6, 6],
    "Suecia": [6, 8, 7, 6, 8, 8, 7, 8, 7, 7],
    "Suiza": [6, 7, 8, 7, 8, 8, 7, 8, 7, 7],
    "Turquía": [6, 8, 7, 7, 7, 7, 8, 7, 8, 7],
    "Túnez": [4, 6, 6, 6, 7, 6, 6, 7, 6, 6],
    "Uruguay": [8, 8, 8, 7, 9, 9, 9, 9, 8, 9],
    "Uzbekistán": [3, 6, 6, 5, 6, 6, 6, 7, 6, 6]
};

// Función para extraer capacidades tácticas
function getCapacidades(equipo) {
    const d = dbEquipos[equipo];
    const ataque = d[1] + d[2] + d[4];
    const defensa = d[7] + d[8] + d[9];
    const soporte = d[0] + d[3] + d[5] + d[6];
    return { ataque, defensa, soporte };
}

document.addEventListener("DOMContentLoaded", () => {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const equiposOrdenados = [...equipos].sort((a, b) => a.localeCompare(b, 'es'));
    
    equiposOrdenados.forEach(eq => {
        let opt1 = document.createElement('option');
        opt1.value = eq; opt1.innerHTML = eq; p1.appendChild(opt1);
        let opt2 = document.createElement('option');
        opt2.value = eq; opt2.innerHTML = eq; p2.appendChild(opt2);
    });
});

function calcularPrediccion() {
    const p1 = document.getElementById('p1').value;
    const p2 = document.getElementById('p2').value;
    const resDiv = document.getElementById('resultado');

    if (!p1 || !p2 || p1 === p2) return;

    const cap1 = getCapacidades(p1);
    const cap2 = getCapacidades(p2);

    // 1. Cálculo de Goles Esperados (xG) de cada equipo
    const golProbA = Math.max(0.2, (cap1.ataque - cap2.defensa + (cap1.soporte * 0.2)) / 2.5);
    const golProbB = Math.max(0.2, (cap2.ataque - cap1.defensa + (cap2.soporte * 0.2)) / 2.5);

    // 2. Diferencia matemática cruda (Ej: +1.8 significa que A debería ganar por casi 2 goles)
    const diffEsperada = golProbA - golProbB;

    // 3. Calculamos todas las diferencias posibles (de -8 a +8 goles) y vemos cuáles son las 3 más cercanas a la realidad
    let posiblesDiferencias = [];
    for (let d = -8; d <= 8; d++) {
        posiblesDiferencias.push({
            diff: d,
            distancia: Math.abs(d - diffEsperada)
        });
    }
    
    // Ordenamos para sacar las 3 diferencias más precisas
    posiblesDiferencias.sort((a, b) => a.distancia - b.distancia);
    const top3Diffs = posiblesDiferencias.slice(0, 3);

    // 4. Armamos el HTML dinámico
    let htmlSalida = `<div class="result-card">
                        <strong>ESCENARIOS POR RENDIMIENTO TÁCTICO</strong><br><br>`;

    top3Diffs.forEach((item) => {
        let d = item.diff;
        
        // Título dinámico para la sección
        let tituloDiff = "";
        if (d === 0) {
            tituloDiff = "Escenario: Empate";
        } else if (d > 0) {
            tituloDiff = `Escenario: Victoria de ${p1} por ${d} gol${d > 1 ? 'es' : ''}`;
        } else {
            tituloDiff = `Escenario: Victoria de ${p2} por ${Math.abs(d)} gol${Math.abs(d) > 1 ? 'es' : ''}`;
        }

        // 5. Para esta diferencia exacta, generamos resultados y nos quedamos con los 3 que mejor calcen con los xG
        let resultadosDiff = [];
        let minA = d > 0 ? d : 0;
        let minB = d < 0 ? -d : 0;
        
        for (let i = 0; i <= 5; i++) {
            let gA = minA + i;
            let gB = minB + i;
            // Evaluamos el "Error" (qué tan lejos está este resultado de los Goles Esperados)
            let errorProb = Math.abs(gA - golProbA) + Math.abs(gB - golProbB);
            resultadosDiff.push({ gA, gB, errorProb });
        }
        
        // Ordenamos los marcadores del que tiene menos error al que tiene más
        resultadosDiff.sort((a, b) => a.errorProb - b.errorProb);
        let top3Resultados = resultadosDiff.slice(0, 3);

        // Agregamos al renderizado
        htmlSalida += `
            <div class="category" style="margin-bottom: 15px;">
                <h4 style="color: #2c3e50; border-bottom: 2px solid #eaeaea; padding-bottom: 5px; margin-bottom: 10px;">${tituloDiff}</h4>
                ${top3Resultados.map((r, index) => {
                    let probTexto = index === 0 ? "Más probable" : (index === 1 ? "Probable" : "Alternativa");
                    let colorSombra = index === 0 ? "#e8f8f5" : (index === 1 ? "#fef9e7" : "#fdf2e9");
                    return `
                    <div class="score-item" style="background-color: ${colorSombra}; padding: 8px; border-radius: 4px; margin-bottom: 5px;">
                        ${p1} <strong>${r.gA} - ${r.gB}</strong> ${p2} 
                        <span style="float: right; font-size: 0.85em; color: #7f8c8d;">${probTexto}</span>
                    </div>`;
                }).join('')}
            </div>
        `;
    });

    htmlSalida += `</div>`;
    resDiv.innerHTML = htmlSalida;
}