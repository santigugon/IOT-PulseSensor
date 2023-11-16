<?php
###########################################################

###########################################################

/* DEFINICION DE TODAS LAS VARIABLES DE CONEXION A MYSQL*/
$SETTINGS["mysql_user"] = 'santigugon';
$SETTINGS["mysql_pass"] = 'Acals315';
$SETTINGS["hostname"] = 'localhost';
$SETTINGS["mysql_database"] = 'tiredirect_vehiculos';


/* Connectar a MySQL */

$mysqli = new mysqli($SETTINGS["hostname"], $SETTINGS["mysql_user"], $SETTINGS["mysql_pass"], $SETTINGS["mysql_database"]);
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
$sqlVehiculos = "SELECT * FROM vehiculos";
$vehiculos = $mysqli->query($sqlVehiculos);

$mysqli2 = new mysqli($SETTINGS["hostname"], $SETTINGS["mysql_user"], $SETTINGS["mysql_pass"], $SETTINGS["mysql_database"]);
$sqlVerificaciones = "SELECT * FROM verificaciones";
$verificaciones = $mysqli2->query($sqlVerificaciones);
$sqlServicios = "SELECT * FROM servicios";
$servicios = $mysqli2->query($sqlServicios);

// CERRAMOS LA CONECCION
$mysqli->close();
