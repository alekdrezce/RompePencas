<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Simulador Mundial 2026</title>
    <style>
        .container { font-family: sans-serif; max-width: 600px; margin: 20px auto; }
        .result-card { border: 1px solid #ccc; padding: 10px; margin: 5px 0; border-radius: 5px; }
        .score { font-weight: bold; color: #2c3e50; }
    </style>
</head>
<body>

<div class="container">
    <h2>Calculadora de Probabilidades</h2>
    <input list="equipos" id="p1" placeholder="Equipo Local">
    <input list="equipos" id="p2" placeholder="Equipo Visitante">
    <button onclick="predecir()">Calcular</button>
    
    <div id="resultado"></div>

    <datalist id="equipos">
        <!-- Lista simplificada de participantes basada en tu entrada -->
        <option value="Alemania"><option value="Argentina"><option value="Brasil"><option value="España"><option value="Inglaterra">
        <option value="México"><option value="Colombia"><option value="Uruguay"><option value="Bélgica"><option value="Francia">
        <option value="Países Bajos"><option value="Suiza"><option value="Croacia"><option value="Portugal"><option value="Senegal">
        <option value="Corea del Sur"><option value="Japón"><option value="Marruecos"><option value="Canadá"><option value="Australia">
    </datalist>
</div>

<script>
// Datos objetivos basados en 'Proyección Ajustada - Diferencia de Goles Mundial 2026'
const diferenciasMatrix = {
    "Alemania": { "Argentina": 0, "Brasil": 0, "España": 0, "Francia": 0, "Inglaterra": 0, "Uruguay": +1 },
    "Argentina": { "Alemania": 0, "Brasil": 0, "España": 0, "Francia": 0, "Inglaterra": 0, "Uruguay": +1 },
    "Brasil": { "Alemania": 0, "Argentina": 0, "España": 0, "Francia": 0, "Inglaterra": 0, "Uruguay": +1 },
    "España": { "Alemania": 0, "Argentina": 0, "Brasil": 0, "Francia": 0, "Inglaterra": 0, "Uruguay": +1 },
    "Inglaterra": { "Alemania": 0, "Argentina": 0, "Brasil": 0, "España": 0, "Francia": 0, "Uruguay": +1 },
    "Uruguay": { "Alemania": -1, "Argentina": -1, "Brasil": -1, "España": -1, "Inglaterra": -1 }
    // Nota: Puedes agregar el resto de los 48 equipos siguiendo este formato con los datos de
};

function predecir() {
    const p1 = document.getElementById('p1').value;
    const p2 = document.getElementById('p2').value;
    const container = document.getElementById('resultado');
    container.innerHTML = "";

    if (!diferenciasMatrix[p1] || !diferenciasMatrix[p1][p2]) {
        container.innerHTML = "Datos no disponibles para este cruce.";
        return;
    }

    const diff = diferenciasMatrix[p1][p2];
    
    // Lógica de 3 resultados (Diferencia, Dif+1, Dif+2)
    const resultados = [
        { label: "Más probable", score: `${Math.abs(diff)}-0` },
        { label: "Probable", score: `${Math.abs(diff)+1}-1` },
        { label: "Poco probable", score: `${Math.abs(diff)+2}-2` }
    ];

    container.innerHTML = `<h3>Predicción para ${p1} vs ${p2} (Dif: ${diff})</h3>`;
    resultados.forEach(res => {
        container.innerHTML += `
            <div class="result-card">
                ${res.label}: <span class="score">${p1} ${res.score} ${p2}</span>
            </div>`;
    });
}
</script>
</body>
</html>