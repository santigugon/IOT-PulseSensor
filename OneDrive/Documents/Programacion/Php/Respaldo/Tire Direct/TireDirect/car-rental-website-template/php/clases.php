<?php

class Vehiculo
{
    private $marca;
    private $tipo;
    private $modelo;
    private $anio;
    private $uso;
    private $kilometraje;
    private $nSerie;
    private $placas;
    private $nPoliza;
    private $imgPoliza;
    private $imgTarjetaCirculacion;

    private $imgVehiculo;


    public function __construct($marca, $tipo, $modelo, $anio, $uso, $kilometraje, $nSerie, $placas, $nPoliza, $imgPoliza, $imgTarjetaCirculacion, $idServicios, $idUsuarios, $idSiniestros, $idVerificaciones, $imgVehiculo)
    {
        $this->tipo = $tipo;
        $this->marca = $marca;
        $this->modelo = $modelo;
        $this->anio = $anio;
        $this->uso = $uso;
        $this->kilometraje = $kilometraje;
        $this->imgVehiculo = $imgVehiculo;
        $this->nSerie = $nSerie;
        $this->placas = $placas;
        $this->nPoliza = $nPoliza;
        $this->imgPoliza = $imgPoliza;
        $this->imgTarjetaCirculacion = $imgTarjetaCirculacion;
    }

    // Getters y Setters para las propiedades
    public function getMarca()
    {
        return $this->marca;
    }

    public function setMarca($marca)
    {
        $this->marca = $marca;
    }

    public function getTipo()
    {
        return $this->tipo;
    }

    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    public function getModelo()
    {
        return $this->modelo;
    }

    public function setModelo($modelo)
    {
        $this->modelo = $modelo;
    }

    public function getAnio()
    {
        return $this->anio;
    }

    public function setAnio($anio)
    {
        $this->anio = $anio;
    }

    public function getUso()
    {
        return $this->uso;
    }

    public function setUso($uso)
    {
        $this->uso = $uso;
    }

    public function getKilometraje()
    {
        return $this->kilometraje;
    }

    public function setKilometraje($kilometraje)
    {
        $this->kilometraje = $kilometraje;
    }

    public function getNSerie()
    {
        return $this->nSerie;
    }

    public function setNSerie($nSerie)
    {
        $this->nSerie = $nSerie;
    }

    public function getPlacas()
    {
        return $this->placas;
    }

    public function setPlacas($placas)
    {
        $this->placas = $placas;
    }

    public function getNPoliza()
    {
        return $this->nPoliza;
    }

    public function setNPoliza($nPoliza)
    {
        $this->nPoliza = $nPoliza;
    }

    public function getImgPoliza()
    {
        return $this->imgPoliza;
    }

    public function setImgPoliza($imgPoliza)
    {
        $this->imgPoliza = $imgPoliza;
    }

    public function getImgTarjetaCirculacion()
    {
        return $this->imgTarjetaCirculacion;
    }

    public function setImgTarjetaCirculacion($imgTarjetaCirculacion)
    {
        $this->imgTarjetaCirculacion = $imgTarjetaCirculacion;
    }
}

class Verificaciones
{

    private $idVehiculo;
    private $fecha;
    private $fotoRecibo;
    private $proximaVerificacion;
    private $alertas;

    private $status;

    public function __construct($idVehiculo, $fecha, $fotoRecibo, $proximaVerificacion, $alertas, $status)
    {

        $this->idVehiculo = $idVehiculo;
        $this->fecha = $fecha;
        $this->fotoRecibo = $fotoRecibo;
        $this->proximaVerificacion = $proximaVerificacion;
        $this->alertas = $alertas;
        $this->status = $status;
    }

    // GETTERS Y SETTERS


    public function getFecha()
    {
        return $this->fecha;
    }

    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
    }

    public function getFotoRecibo()
    {
        return $this->fotoRecibo;
    }

    public function setFotoRecibo($fotoRecibo)
    {
        $this->fotoRecibo = $fotoRecibo;
    }

    public function getProximaVerificacion()
    {
        return $this->proximaVerificacion;
    }

    public function setProximaVerificacion($proximaVerificacion)
    {
        $this->proximaVerificacion = $proximaVerificacion;
    }

    public function getAlertas()
    {
        return $this->alertas;
    }

    public function setAlertas($alertas)
    {
        $this->alertas = $alertas;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function getIdVehiculo()
    {
        return $this->idVehiculo;
    }

    public function setIdVehiculo($idVehiculo)
    {
        $this->idVehiculo = $idVehiculo;
    }

    public function calcularEstadoVerificacion($placas)
    {
        // Obtenemos el último dígito de las placas
        $ultimoDigitoPlacas = substr($placas, -1);

        // Convertimos la fecha de la última verificación a objeto DateTime
        $fecha = new DateTime($this->fecha);

        // Obtenemos la fecha actual
        $fechaActual = new DateTime();

        // Calculamos la diferencia en días entre la fecha actual y la fecha de la última verificación
        $diferenciaDias = $fechaActual->diff($fecha)->days;

        // Calculamos la fecha límite para la siguiente verificación
        $fechaLimite = $fecha->modify('+1 year');

        // Comparamos el último dígito de las placas con la fecha de la última verificación
        if ($ultimoDigitoPlacas == $fecha->format('Y') % 10) {
            if ($diferenciaDias < 30) {
                return 'Amarillo';
            } elseif ($fechaActual > $fechaLimite) {
                return 'Rojo';
            }
        }

        return ['Verde', "Tienes " . $diferenciaDias . " días para realizar tu verificación"];
    }
}
