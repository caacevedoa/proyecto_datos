function enviar_datos() {

     // ➤ Mostrar loader antes de enviar datos
    document.getElementById("loader").style.display = "block";

    // ➤ Ocultar resultados mientras carga
    document.getElementById("resultado").style.display = "none";

    var age = parseInt(document.getElementById("age").value);
    var gender = parseInt(document.getElementById("gender").value);
    var bmi = parseInt(document.getElementById("bmi").value);
    var daily_steps = parseInt(document.getElementById("daily_steps").value);
    var sleep_hours = parseInt(document.getElementById("sleep_hours").value);
    var water_intake = parseInt(document.getElementById("water_intake").value);
    var calories_consumed = parseInt(document.getElementById("calories_consumed").value);
    var smoker = parseInt(document.getElementById("smoker").value);
    var alcohol = parseInt(document.getElementById("alcohol").value);
    var resting_hr = parseInt(document.getElementById("resting_hr").value);
    var systolic_bp = parseInt(document.getElementById("systolic_bp").value);
    var diastolic_bp = parseInt(document.getElementById("diastolic_bp").value);
    var cholesterol = parseInt(document.getElementById("cholesterol").value);
    var family_history = parseInt(document.getElementById("family_history").value);

    const variables = [
        age, gender, bmi, daily_steps, sleep_hours, water_intake, calories_consumed,
        smoker, alcohol, resting_hr, systolic_bp, diastolic_bp, cholesterol, family_history
    ];
    

    var endpoint = "http://127.0.0.1:5000/estado_de_salud";

    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ variables: variables })
    })
    .then(response => response.json())
    .then(data => {

        // ➤ Cuando llega la respuesta
        document.getElementById("loader").style.display = "none";
        document.getElementById("resultado").style.display = "block";
        document.getElementById("res_knn").innerHTML = "KNN: " + data.KNN;
        document.getElementById("res_red").innerHTML = "Red Neuronal: " + data.Red_Neuronal;
        document.getElementById("res_reg").innerHTML = "Regresión: " + data.Regresion;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema con el servidor.");
    });

}

function toggleMode() {

    document.body.classList.toggle("dark");

    const icon = document.getElementById("modeIcon");

    if (document.body.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }
}
