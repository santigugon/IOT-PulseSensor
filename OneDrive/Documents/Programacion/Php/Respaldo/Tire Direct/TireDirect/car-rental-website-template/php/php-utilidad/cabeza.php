<?php include './configuradorBusqueda.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <link rel="icon" href="../assets/images/rayasTire.ico" />
  <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet" />

  <title>TD || Vehiculos</title>

  <!-- Bootstrap core CSS -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Additional CSS Files -->
  <link rel="stylesheet" href="../assets/css/fontawesome.css" />
  <link rel="stylesheet" href="../assets/css/style.css" />
  <link rel="stylesheet" href="../assets/css/owl.css" />
</head>


<!-- ***** Preloader Start ***** -->
<div id="preloader">
  <div class="jumper">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
<!-- ***** Preloader End *****

<!-- Header -->

<!-- Bootstrap core JavaScript -->
<script src="../vendor/jquery/jquery.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- LIBRERIA PARA ZOOM DE LAS IMAGENES -->
<link rel="stylesheet" type="text/css" href="https://unpkg.com/panzoom/dist/panzoom.min.css">
<script src="https://unpkg.com/panzoom/dist/panzoom.min.js"></script>


<!-- Additional Scripts -->
<script src="../assets/js/custom.js"></script>
<script src="../assets/js/owl.js"></script>


<header class="">
  <nav class="navbar navbar-expand-lg sticky">
    <div class="container">
      <a class="navbar-brand" href="./inventario.php">
        <h2>TIRE DIRECT <em>VEHICULOS</em></h2>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item <?php echo ($modo === "inventario2") ? "active" : ""; ?>">
            <a class="nav-link" href="<?php configurarBusqueda("inventario2") ?>">Resumen

            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link <?php echo ($modo === "usuarios") ? "active" : ""; ?>" href="<?php configurarBusqueda("usuarios") ?>">Usuarios
              <span class="sr-only">(current)</span>
            </a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle  <?php echo ($modo === "serviciosCorrectivos" || $modo === "serviciosPreventivos") ? "active" : ""; ?>" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Servicios</a>

            <div class="dropdown-menu ">
              <a class="dropdown-item  <?php echo ($modo === "serviciosPreventivos") ? "active" : ""; ?>" href="<?php configurarBusqueda("serviciosPreventivos") ?>">Preventivos</a>
              <a class="dropdown-item <?php echo ($modo === "serviciosCorrectivos") ? "active" : ""; ?>" href="<?php configurarBusqueda("serviciosCorrectivos") ?>">Correctivos</a>

            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link <?php echo ($modo === "verificaciones") ? "active" : ""; ?>" href="<?php configurarBusqueda("verificaciones") ?> position-relative"">Verificaciones</a>
          </li>
          <li class=" nav-item">
              <a class="nav-link <?php echo ($modo === "siniestro") ? "active" : ""; ?>" href="<?php configurarBusqueda("siniestro") ?>">Siniestro
                <span class=" notificacion  top-100 position-absolute translate-middle p-2 bg-danger border border-light rounded-circle">
                  <span class="visually-hidden"></span>
                </span></a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="./iniciarSesion.php">Iniciar sesion</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<div class="clearfix"></div>