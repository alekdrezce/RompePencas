// script.js - Simulador WC 2026 - Versión Probabilidad Estadística (Poisson)

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

// Función de factoriales para Poisson
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let f = 1;
    for (let i = 2; i <= n; i++) f *= i;
    return f;
}

// Función de Probabilidad Poisson
function poisson(k, lambda) {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

// Extraer capacidades
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
    
    // Chequeo de seguridad: te avisa en la consola si los IDs del HTML no coinciden
    if (!p1 || !p2) {
        console.error("¡Ojo! El script no encuentra los <select> con id='p1' y id='p2' en tu HTML.");
        return;
    }

    // Limpiamos los select y agregamos una opción por defecto
    p1.innerHTML = '<option value="" disabled selected>Seleccioná un equipo...</option>';
    p2.innerHTML = '<option value="" disabled selected>Seleccioná un equipo...</option>';

    // Ordenamos alfabéticamente
    const equiposOrdenados = [...equipos].sort((a, b) => a.localeCompare(b, 'es'));
    
    // Llenamos los dropdowns
    equiposOrdenados.forEach(eq => {
        let opt1 = document.createElement('option');
        opt1.value = eq; 
        opt1.textContent = eq; 
        p1.appendChild(opt1);
        
        let opt2 = document.createElement('option');
        opt2.value = eq; 
        opt2.textContent = eq; 
        p2.appendChild(opt2);
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
    const golProbA = Math.max(0.3, (cap1.ataque - cap2.defensa + (cap1.soporte * 0.2)) / 2.5);
    const golProbB = Math.max(0.3, (cap2.ataque - cap1.defensa + (cap2.soporte * 0.2)) / 2.5);

    let resultadosExactos = [];
    let diffAgrupadas = {};
    let totalProb = 0;

    // 2. Simulamos todos los resultados posibles (0-0 hasta 7-7) con Poisson
    for(let i = 0; i <= 7; i++) {
        for(let j = 0; j <= 7; j++) {
            let prob = poisson(i, golProbA) * poisson(j, golProbB);
            let diff = i - j;
            
            resultadosExactos.push({ gA: i, gB: j, diff: diff, prob: prob });
            
            if(!diffAgrupadas[diff]) diffAgrupadas[diff] = 0;
            diffAgrupadas[diff] += prob;
            totalProb += prob;
        }
    }

    // 3. Obtenemos las 3 diferencias más probables ordenadas por porcentaje
    let top3Diffs = Object.keys(diffAgrupadas).map(d => ({
        diff: parseInt(d),
        prob: diffAgrupadas[d] / totalProb
    })).sort((a, b) => b.prob - a.prob).slice(0, 3);

    // 4. Armamos el HTML limpio
    let htmlSalida = `<div class="result-card">`;

    top3Diffs.forEach((item) => {
        let d = item.diff;
        let diffPorcentaje = (item.prob * 100).toFixed(1);
        
        // Títulos dinámicos y al pie
        let tituloDiff = "";
        if (d === 0) {
            tituloDiff = `Empate <span style="font-weight:normal; font-size:0.9em; color:#7f8c8d; float:right;">${diffPorcentaje}%</span>`;
        } else if (d > 0) {
            tituloDiff = `Victoria de ${p1} por ${d} <span style="font-weight:normal; font-size:0.9em; color:#7f8c8d; float:right;">${diffPorcentaje}%</span>`;
        } else {
            tituloDiff = `Victoria de ${p2} por ${Math.abs(d)} <span style="font-weight:normal; font-size:0.9em; color:#7f8c8d; float:right;">${diffPorcentaje}%</span>`;
        }

        // Buscamos los 3 marcadores exactos con más probabilidad para ESA diferencia
        let top3Resultados = resultadosExactos.filter(r => r.diff === d)
            .sort((a, b) => b.prob - a.prob)
            .slice(0, 3);

        htmlSalida += `
            <div class="category" style="margin-bottom: 20px;">
                <h4 style="color: #2c3e50; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 12px; font-size: 1.1em;">${tituloDiff}</h4>
                ${top3Resultados.map(r => {
                    let probScore = (r.prob / totalProb * 100).toFixed(1);
                    return `
                    <div class="score-item" style="padding: 10px; border-bottom: 1px solid #ecf0f1; margin-bottom: 4px; background-color: #fcfcfc;">
                        ${p1} <strong style="font-size: 1.1em;">${r.gA} - ${r.gB}</strong> ${p2} 
                        <span style="float: right; font-weight: 600; color: #2980b9;">${probScore}%</span>
                    </div>`;
                }).join('')}
            </div>
        `;
    });

    htmlSalida += `</div>`;
    resDiv.innerHTML = htmlSalida;
}