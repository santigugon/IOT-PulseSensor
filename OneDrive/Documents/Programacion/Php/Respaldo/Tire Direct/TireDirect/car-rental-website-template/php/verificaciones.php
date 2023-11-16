<?php include '../php/php-utilidad/cabeza.php'; ?>
<?php include './objetoPrueba.php'; ?>

<?php
$mysqli = new mysqli($SETTINGS["hostname"], $SETTINGS["mysql_user"], $SETTINGS["mysql_pass"], $SETTINGS["mysql_database"]);
$sqlVerificaciones = "SELECT * FROM verificaciones";
$verificacion = $mysqli->query($sqlVerificaciones);
$mysqli->close(); ?>

<?php function calcularEstadoVerificacion($placas, $fechaUltimaVerificacion)
{
    // Obtenemos el último dígito de las placas
    $ultimoDigitoPlacas = substr($placas, -1);

    // Convertimos la fecha de la última verificación a objeto DateTime
    $fechaUltimaVerificacion = new DateTime($fechaUltimaVerificacion);

    // Obtenemos la fecha actual
    $fechaActual = new DateTime();

    // Calculamos la diferencia en días entre la fecha actual y la fecha de la última verificación
    $diferenciaDias = $fechaActual->diff($fechaUltimaVerificacion)->days;

    // Calculamos la fecha límite para la siguiente verificación
    $fechaLimite = $fechaUltimaVerificacion->modify('+1 year');

    // Comparamos el último dígito de las placas con la fecha de la última verificación
    if ($ultimoDigitoPlacas == $fechaUltimaVerificacion->format('Y') % 10) {
        if ($diferenciaDias < 30) {
            return 'Amarillo';
        } elseif ($fechaActual > $fechaLimite) {
            return 'Rojo';
        }
    }

    return ['Verde', "Tienes " . $diferenciaDias . " días para realizar tu verificación"];
}
?>

<?php foreach ($verificacion as $infoVerificacion) : {

        if ($infoVerificacion["idVehiculo"] == $currentCar["idVehiculo"]) {
            $currentVerificacion = $infoVerificacion;
        };
    }

endforeach
?>
<?php

// Lógica para determinar el estado de las luces del semáforo
$estadoRojo = ""; // Agrega la clase "animacion" si deseas que la luz roja parpadee
$estadoAmarillo = ""; // Agrega la clase "animacion" si deseas que la luz amarilla parpadee
$estadoVerde = ""; // Agrega la clase "animacion" si deseas que la luz verde parpadee

$estado = calcularEstadoVerificacion($currentCar["placas"], $currentVerificacion["fechaVerificacion"]);

if ($estado[0] == "Rojo") {
    $estadoRojo = "animacion";
} else if ($estado[0] == "Amarillo") {
    $estadoAmarillo = "animacion";
} else if ($estado[0] === "Verde") {
    $estadoVerde = "animacion";
}


?>
<div class="best-features">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-heading">
                    <h2>VERIFICACIONES</h2>
                </div>
            </div>
            <div class="col-md-6">
                <div class="left-content">

                    <ul class="featured-list">

                        <!-- CARACTERISTICAS DEL VEHICULOS -->
                        <li><b>MODELO</b>:<?php echo $currentCar["modelo"] ?></li>
                        <li><b>MARCA:</b><?php echo $currentCar["marca"] ?></li>
                        <li><b>AÑO:</b><?php echo $currentCar["anio"] ?></li>
                        <li><b>FECHA DE VERIFICACION:</b><?php echo $currentVerificacion["fechaVerificacion"] ?></li>
                        <li><b>PLACAS:</b><?php echo $currentCar["placas"] ?></li>

                        <li>



                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="openModal()">>
                                RECIBO
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                                    <div class=" modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Poliza de seguro</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeModal()">&#10005;</button>
                                        </div>
                                        <div class="modal-body">

                                            <div id="zoomable-image">
                                                <img class="imagen-poliza" src="<?php $imgRecibo = json_decode($currentVerificacion["imgRecibo"], true);
                                                                                echo $imgRecibo[0] ?>" alt="ImagenPoliza">
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeModal()">Close</button>
                                            <!-- <button type="button" class="btn btn-primary">Understood</button> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
            <div class="col-md-6">
                <!-- CARRUSEL DE IMAGENES DEL VEHICULO PARA SABER EL ESTADO EN EL QUE SE ENCUENTRA -->
                <div class="semaforo-container">

                    <div class="semaforo">
                        <div class="relative">
                            <div class="luz rojo <?php echo $estadoRojo; ?>">
                            </div>

                            <div class="alerta-absoluto-rojo ">

                                <?php if ($estadoRojo == "animacion") {
                                    echo '<div class="alert alert-danger" role="alert">';
                                    echo 'Estatus rojo!';
                                    echo '</div>';
                                } ?>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="luz amarillo <?php echo $estadoAmarillo; ?>">
                            </div>

                            <div class="alerta-absoluto-amarillo ">

                                <?php if ($estadoAmarillo == "animacion") {
                                    echo '<div class="alert alert-warning" role="alert">';
                                    echo 'Estatus Amarillo!';
                                    echo '</div>';
                                } ?>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="luz verde <?php echo $estadoVerde; ?>">
                            </div>

                            <div class="alerta-absoluto-verde ">

                                <?php if ($estadoVerde == "animacion") {
                                    echo '<div class="alert alert-success" role="alert">';
                                    echo 'Estatus verde, ' . $estado[1];
                                    echo '</div>';
                                } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






<?php include '../php/php-utilidad/piePagina.php'; ?>