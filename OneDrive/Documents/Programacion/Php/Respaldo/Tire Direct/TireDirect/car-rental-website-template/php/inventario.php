<?php include '../php/php-utilidad/cabeza.php'; ?>
<?php include './objetoPrueba.php'; ?>



<?php
$marca = $modelo = $tipo = $uso = $placas = "";
$mysqli = new mysqli($SETTINGS["hostname"], $SETTINGS["mysql_user"], $SETTINGS["mysql_pass"], $SETTINGS["mysql_database"]);
/* check connection */
if (mysqli_connect_errno()) {
  printf("Connect failed: %s\n", mysqli_connect_error());
  exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $modelo = "SANGU";

  echo "HOLAA";
  header('Location: feedback.php');
}
?>



<!-- MENU DE BUSQUEDA -->
<h2 class="text-center">BIENVENIDO AL BUSCADOR Y ADMINISTRADOR DE VEHICULOS DE TIRE DIRECT</h2>

<form class="row g-3 p buscador margin-top-15 border-dark flex-center" method="POST" action="<?php echo htmlspecialchars(
                                                                                                $_SERVER['PHP_SELF']
                                                                                              ); ?>">

  <div class="col-md-4 margin-top-5">
    <label for="validationDefault01" class="form-label">Marca</label>
    <input type="text" class="form-control" id="validationDefault01" value="<?php echo $marca ?>" name="marca" required>
  </div>
  <div class="col-md-4 margin-top-5">
    <label for="validationDefault02" class="form-label">Modelo</label>
    <input type="text" class="form-control" id="validationDefault02" value="<?php echo $modelo ?>" name="modelo" required>
  </div>

  <div class="col-md-3 margin-top-5">
    <div class="col-md-4 margin-top-5">
      <label for="validationDefault03" class="form-label">Tipo</label>
      <select class="form-select" id="validationDefault03" name="tipo" required>
        <option selected disabled value="">Elige...</option>
        <option>Motocicleta</option>
        <option>Coche</option>
        <option>Camioneta Pickup</option>
        <option>Camion</option>
      </select>
    </div>
  </div>
  <div class="col-md-3 margin-top-5">
    <div class="col-md-4 margin-top-5">
      <label for="validationDefault04" class="form-label">Uso</label>
      <select class="form-select" id="validationDefault04" name="uso" required>
        <option selected disabled value="">Elige...</option>
        <option>Particular</option>
        <option>Utilitario</option>
        <option>Trabajo</option>
      </select>
    </div>
  </div>
  <div class="col-md-3 margin-top-5">
    <label for="validationDefault05" class="form-label">Placas</label>
    <input type="text" class="form-control" id="validationDefault05" name="placas" required>
  </div>

  <div class="col-12 margin-top-5">
    <button class="btn btn-primary" type="submit">Buscar</button>
  </div>
</form>


</div>

<!-- LISTA DE AUTOS BUSCADOS -->
<div class="container text-center border border-dark rounded-pill text-bg-dark px-4 margin-top-15">
  <div class="row margin-top-5">
    <div class="col">MARCA</div>
    <div class="col">MODELO</div>
    <div class="col">AÑO</div>
    <div class="col">KILOMETRAJE</div>
    <div class="col">PLACAS</div>
  </div>

  <ul class="list-group margin-top-15">
    <?php foreach ($vehiculos as $vehiculo) : ?>
      <a href="<?php $idVehiculo = $vehiculo["idVehiculo"];
                $url = './' . $modo . '.php?idVehiculo=' . $idVehiculo . "&seccion=" . $modo;
                echo $url;
                ?>" class="list-group-item list-group-item-action list-group-item-primary" id="lista-href lista">

        <div class="row margin-top-5">
          <div class="col"><?php echo $vehiculo["marca"] ?></div>
          <div class="col"><?php echo $vehiculo["modelo"] ?></div>
          <div class="col"><?php echo $vehiculo["anio"] ?></div>
          <div class="col"><?php echo $vehiculo["kilometraje"] ?></div>
          <div class="col"><?php echo $vehiculo["placas"] ?></div>
        </div>
      </a>

    <?php endforeach; ?>
  </ul>
  <!-- SISTEMA DE PAGINACION -->
  <div class="container d-flex justify-content-center margin-top-15">

    <nav aria-label="navbar-brand mx-auto ">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>



</div>




<?php include '../php/php-utilidad/piePagina.php';
?>