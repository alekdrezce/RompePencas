// script.js - Simulador WC 2026 - Versión Definitiva (Motor Táctico + Diferencias)

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
    // Ataque: Figura(1) + Titulares(2) + Táctica(4)
    const ataque = d[1] + d[2] + d[4];
    // Defensa: Físico(7) + Pelota Parada(8) + Psicología(9)
    const defensa = d[7] + d[8] + d[9];
    // Soporte: Histórico(0) + Banco(3) + DT(5) + Racha(6)
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

    // 1. Calculamos capacidades
    const cap1 = getCapacidades(p1);
    const cap2 = getCapacidades(p2);

    // 2. Motor Táctico (Divisor 2.5 para mantener agresividad en las diferencias reales)
    const golProbA = Math.max(0.5, (cap1.ataque - cap2.defensa + (cap1.soporte * 0.2)) / 2.5);
    const golProbB = Math.max(0.5, (cap2.ataque - cap1.defensa + (cap2.soporte * 0.2)) / 2.5);

    // 3. Definimos los resultados según DIFERENCIA
    
    // Categoría: Paridad (Empate)
    const paridad = [{gA: 0, gB: 0}, {gA: 1, gB: 1}, {gA: 2, gB: 2}];

    // Categoría: Victoria Ajustada (Diferencia de 1 gol)
    const ajustadas = [];
    if (golProbA > golProbB) {
        ajustadas.push({gA: Math.round(golProbA), gB: Math.round(golProbA)-1});
        ajustadas.push({gA: Math.round(golProbA)+1, gB: Math.round(golProbA)});
        ajustadas.push({gA: Math.round(golProbA)+2, gB: Math.round(golProbA)+1});
    } else {
        ajustadas.push({gA: Math.round(golProbB)-1, gB: Math.round(golProbB)});
        ajustadas.push({gA: Math.round(golProbB), gB: Math.round(golProbB)+1});
        ajustadas.push({gA: Math.round(golProbB)+1, gB: Math.round(golProbB)+2});
    }

    // Categoría: Victoria Clara (Diferencia de 2 o más goles)
    const claras = [];
    if (golProbA > golProbB) {
        claras.push({gA: Math.round(golProbA)+1, gB: Math.round(golProbB)-1});
        claras.push({gA: Math.round(golProbA)+2, gB: Math.round(golProbB)-1});
        claras.push({gA: Math.round(golProbA)+3, gB: Math.round(golProbB)});
    } else {
        claras.push({gA: Math.round(golProbA)-1, gB: Math.round(golProbB)+1});
        claras.push({gA: Math.round(golProbA)-1, gB: Math.round(golProbB)+2});
        claras.push({gA: Math.round(golProbA), gB: Math.round(golProbB)+3});
    }

    // Prevención de goles negativos en los arrays
    const cleanNegative = (arr) => arr.map(r => ({
        gA: Math.max(0, r.gA),
        gB: Math.max(0, r.gB)
    }));

    const ajustadasLimpio = cleanNegative(ajustadas);
    const clarasLimpio = cleanNegative(claras);

    // 4. Renderizado Categorizado
    resDiv.innerHTML = `
        <div class="result-card">
            <strong>ANÁLISIS POR DIFERENCIA TÁCTICA</strong>
            <br><br>
            <div class="category">
                <h4>Empate / Paridad</h4>
                ${paridad.map(r => `<div class="score-item" style="color: #555;">${p1} <strong>${r.gA} - ${r.gB}</strong> ${p2}</div>`).join('')}
            </div>
            <br>
            <div class="category">
                <h4>Victoria Ajustada (Diferencia de 1 gol)</h4>
                ${ajustadasLimpio.map(r => `<div class="score-item" style="color: #d35400;">${p1} <strong>${r.gA} - ${r.gB}</strong> ${p2}</div>`).join('')}
            </div>
            <br>
            <div class="category">
                <h4>Victoria Clara (Diferencia de 2+ goles)</h4>
                ${clarasLimpio.map(r => `<div class="score-item" style="color: #27ae60;">${p1} <strong>${r.gA} - ${r.gB}</strong> ${p2}</div>`).join('')}
            </div>
        </div>
    `;
}