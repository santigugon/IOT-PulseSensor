<?php include './config.php'; ?>
<?php
// $modo = "default";


function configurarBusqueda($modo)
{
    if (isset($_GET['idVehiculo'])) {
        $idVehiculo = $_GET['idVehiculo'];
        $url = './' . $modo . '.php?idVehiculo=' . $idVehiculo . "&seccion=" . $modo;
        echo $url;


        // echo $idVehiculo;


    } else if ($modo == "usuarios" && !isset($_GET['idVehiculo'])) {
        echo './' . $modo . '.php?seccion=' . $modo;
    } else if (!isset($_GET['idVehiculo'])) {
        $url = './inventario.php?seccion=' . $modo;
        echo $url;
    }
}

if (isset($_GET['seccion'])) {
    $modo = $_GET['seccion'];
} else {
    $modo = "inventario2";
}
if (isset($_GET['idVehiculo'])) {
    foreach ($vehiculos as $vehiculo) :
        // print_r($car["idVehiculo"]);
        $idVehiculo = $_GET['idVehiculo'];
        if ($vehiculo["idVehiculo"] == $idVehiculo) {
            $currentCar = $vehiculo;
        }


    endforeach;
}
