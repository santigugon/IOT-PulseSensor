<?php include '../php/php-utilidad/cabeza.php'; ?>



<?php
$mysqli = new mysqli($SETTINGS["hostname"], $SETTINGS["mysql_user"], $SETTINGS["mysql_pass"], $SETTINGS["mysql_database"]);
$sqlServicios = "SELECT * FROM servicios";
$verificaciones = $mysqli->query($sqlServicios);
$mysqli->close(); ?>
<?php
$currentServicios = [];
$ultimoServicio = date("3000-06-10"); //USAMOS ESTE SERVICIO PARA BUSCAR EL MAS CERCANO 
$fechaActual = date("Y-m-d");
foreach ($servicios as $servicio) : {

        if ($servicio["idVehiculo"] == $currentCar["idVehiculo"] && $servicio["tipo"] === $tipo) {
            array_push($currentServicios, $servicio);
        };
        if ($servicio["idVehiculo"] == $currentCar["idVehiculo"] && $servicio["tipo"] === "preventivo") {

            if (abs(date_diff(date_create($fechaActual), date_create($servicio['fechaServicio']))->format("%a")) < abs(date_diff(date_create($fechaActual), date_create($ultimoServicio))->format("%a"))) {
                $ultimoServicio = $servicio["fechaServicio"];
                $proximoServicio = $servicio["fechaProxServicio"];
            }
        };
    }

endforeach;

function calcularDiasProxServicio($fechaServicio)
{


    // Obtener la fecha actual
    $fechaActual = date("Y-m-d");

    // Calcular la diferencia de días
    $diff = date_diff(date_create($fechaActual), date_create($fechaServicio));
    $diasFaltantes = $diff->format("%a");


    $fechaServicioFormateada = date("d-m-Y", strtotime($fechaServicio));
    // Asignar un color en función de los días faltantes
    if ($diasFaltantes > 30) {
        $color = "green";
    } elseif ($diasFaltantes > 1) {
        $color = "orange";
    } else {
        $color = "red";
    }

    // Imprimir el texto con el color correspondiente
    echo "<h5 style='color: $color;'>Días faltantes para el próximo servicio: $diasFaltantes ($fechaServicioFormateada)</h5>";
}

?>
<!-- Page Content -->
<div class="page-heading about-heading header-text" style="background-image: url(assets/images/heading-5-1920x500.jpg);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="text-content">
                    <h4>Servicios</h4>
                    <h2><?php echo $tipo ?></h2>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="team-members">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-heading">

                    <h2>Bienvenido al sistema de Servicios: <br>
                        <?php echo $currentCar["marca"] . " ";
                        echo $currentCar["modelo"] . " ";
                        echo $currentCar['anio'] . " "; ?> </h2>
                </div>

                <?php
                if (empty($currentServicios)) {

                    echo " <h5> LO SENTIMOS NO HAY SERVICIOS " . strtoupper($tipo) . "S REGISTRADOS PARA ESTA UNIDAD </h5>";
                    echo "<i class='fa-light fa-circle-exclamation'></i>";
                }
                echo    calcularDiasProxServicio($proximoServicio);
                echo "<br>";

                foreach ($currentServicios as $servicio) : ?>


                    <h5>Servicio de tipo <?php echo $servicio["tipo"];
                                            echo " realizado en la fecha " . $servicio["fechaServicio"] ?></h5>

                    <p><?php echo "<b>Trabajo realizado: </b>" . $servicio["trabajoRealizado"] .  " realizado por la empresa " . $servicio["empresa"] . " y con un costo de $" .  $servicio["costo"];
                        echo ".<br>";
                        echo "<br>";

                        echo "<b>Contacto de la empresa:</b> " . $servicio["contacto"];
                        echo "<br>";
                        echo "<b>Proximo servicio agendado </b> " . $servicio['fechaProxServicio'];
                        echo "<br>";
                        echo "<br>";



                        ?>

                        <button>HOLA</button>
                        <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="99" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                            <div class=" modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Factura servicio</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeModal()">&#10005;</button>
                                </div>
                                <div class="modal-body">

                                    <div id="zoomable-image">
                                        <img class="imagen-poliza" src="<?php $imgFactura = json_decode($servicio["imgFactura"], true);
                                                                        echo $imgFactura[0] ?>" alt="ImagenFactura">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeModal()">Close</button>
                                    <!-- <button type="button" class="btn btn-primary">Understood</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    </p>


                <?php
                    echo "<br>";
                endforeach;
                ?>


            </div>
        </div>
    </div>
</div>


<?php include '../php/php-utilidad/piePagina.php'; ?>