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
// Mapeo de Banderas para la UI
const banderas = {
    "Alemania": "🇩🇪", "Arabia Saudita": "🇸🇦", "Argelia": "🇩🇿", "Argentina": "🇦🇷", "Australia": "🇦🇺", "Austria": "🇦🇹",
    "Bélgica": "🇧🇪", "Bosnia y Herzegovina": "🇧🇦", "Brasil": "🇧🇷", "Cabo Verde": "🇨🇻", "Canadá": "🇨🇦", "Colombia": "🇨🇴",
    "Corea del Sur": "🇰🇷", "Costa de Marfil": "🇨🇮", "Croacia": "🇭🇷", "Curazao": "🇨🇼", "Ecuador": "🇪🇨", "Egipto": "🇪🇬", "Escocia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "España": "🇪🇸",
    "Estados Unidos": "🇺🇸", "Francia": "🇫🇷", "Ghana": "🇬🇭", "Haití": "🇭🇹", "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Irak": "🇮🇶", "Irán": "🇮🇷", "Japón": "🇯🇵",
    "Jordania": "🇯🇴", "Marruecos": "🇲🇦", "México": "🇲🇽", "Noruega": "🇳🇴", "Nueva Zelanda": "🇳🇿", "Panamá": "🇵🇦",
    "Paraguay": "🇵🇾", "Países Bajos": "🇳🇱", "Portugal": "🇵🇹", "Qatar": "🇶🇦", "RD Congo": "🇨🇩",
    "República Checa": "🇨🇿", "Senegal": "🇸🇳", "Sudáfrica": "🇿🇦", "Suecia": "🇸🇪", "Suiza": "🇨🇭", "Turquía": "🇹🇷", "Túnez": "🇹🇳", "Uruguay": "🇺🇾", "Uzbekistán": "🇺🇿"
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

    const f1 = dbEquipos[p1].reduce((a, b) => a + b, 0);
    const f2 = dbEquipos[p2].reduce((a, b) => a + b, 0);
    const diffTotal = f1 - f2;

    const cap1 = getCapacidades(p1);
    const cap2 = getCapacidades(p2);

    // 1. xG Base (Goles Esperados)
    let ratioOfensivoA = cap1.ataque / cap2.defensa; 
    let ratioOfensivoB = cap2.ataque / cap1.defensa;
    
    let pesoSoporteA = cap1.soporte / 40; 
    let pesoSoporteB = cap2.soporte / 40;

    let golProbA = (ratioOfensivoA * 1.3) + (pesoSoporteA * 0.6);
    let golProbB = (ratioOfensivoB * 1.3) + (pesoSoporteB * 0.6);

    // 2. Multiplicador mitigado
    if (diffTotal > 8) {
        let ventaja = diffTotal - 8;
        let impactoMitigado = Math.sqrt(ventaja) * 0.4; 
        golProbA += impactoMitigado; 
        golProbB = Math.max(0.3, golProbB - (impactoMitigado * 0.2)); 
    } else if (diffTotal < -8) {
        let ventaja = Math.abs(diffTotal) - 8;
        let impactoMitigado = Math.sqrt(ventaja) * 0.4;
        golProbB += impactoMitigado;
        golProbA = Math.max(0.3, golProbA - (impactoMitigado * 0.2));
    }

    golProbA = Math.min(golProbA, 3.8);
    golProbB = Math.min(golProbB, 3.8);

    let resultadosExactos = [];
    let diffAgrupadas = {};
    let totalProb = 0;

    // 3. Simulación Poisson
    for(let i = 0; i <= 5; i++) {
        for(let j = 0; j <= 5; j++) {
            let prob = poisson(i, golProbA) * poisson(j, golProbB);
            let diff = i - j;
            
            resultadosExactos.push({ gA: i, gB: j, diff: diff, prob: prob });
            
            if(!diffAgrupadas[diff]) diffAgrupadas[diff] = 0;
            diffAgrupadas[diff] += prob;
            totalProb += prob;
        }
    }

    // 4. Obtenemos las 3 diferencias matemáticas más probables
    let top3Diffs = Object.keys(diffAgrupadas).map(d => ({
        diff: parseInt(d),
        prob: diffAgrupadas[d] / totalProb
    })).sort((a, b) => b.prob - a.prob).slice(0, 3);

    // 5. RENDERIZADO UI HORIZONTAL
    const etiquetas = ["Más probable", "Probable", "Menos probable"];
    const flag1 = banderas[p1] || "";
    const flag2 = banderas[p2] || "";

    let htmlSalida = `<div class="result-card">`;

    top3Diffs.forEach((item, index) => {
        let d = item.diff;
        let etiqueta = etiquetas[index];
        
        let tituloDiff = "";
        if (d === 0) {
            tituloDiff = `${etiqueta}: Empate`;
        } else if (d > 0) {
            tituloDiff = `${etiqueta}: ${p1} +${d} Gol${d > 1 ? 'es' : ''}`;
        } else {
            tituloDiff = `${etiqueta}: ${p2} +${Math.abs(d)} Gol${Math.abs(d) > 1 ? 'es' : ''}`;
        }

        // Filtramos resultados de esa diferencia y ordenamos
        let top3Resultados = resultadosExactos.filter(r => r.diff === d)
            .sort((a, b) => b.prob - a.prob)
            .slice(0, 3);

        // Construimos la línea de resultados horizontal con banderas
        let resultadosHTML = top3Resultados.map(r => {
            let probScore = (r.prob / totalProb * 100).toFixed(1);
            return `<span style="margin-right: 20px; font-size: 1.1em;">${flag1} <strong>${r.gA}-${r.gB}</strong> ${flag2} <span style="font-weight: 600; color: #2980b9; margin-left: 5px;">${probScore}%</span></span>`;
        }).join('');

        htmlSalida += `
            <div class="category" style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 1.1em; border-bottom: 2px solid #ecf0f1; padding-bottom: 5px;">${tituloDiff}</h4>
                <div style="display: flex; flex-wrap: wrap; align-items: center; padding: 5px 0;">
                    ${resultadosHTML}
                </div>
            </div>
        `;
    });

    htmlSalida += `</div>`;
    resDiv.innerHTML = htmlSalida;
}