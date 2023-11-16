<?php include '../php/php-utilidad/cabeza.php'; ?>
<?php include './objetoPrueba.php'; ?>


<?php

// print_r($currentCar);
?>


<div class="best-features">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-heading">
                    <h2>INVENTARIO</h2>
                </div>
            </div>
            <div class="col-md-6">
                <div class="left-content">

                    <ul class="featured-list">

                        <!-- CARACTERISTICAS DEL VEHICULOS -->
                        <li><b>MODELO:</b><?php echo $currentCar["modelo"] ?></li>
                        <li><b>MARCA:</b><?php echo $currentCar["marca"] ?></li>
                        <li><b>AÑO:</b><?php echo $currentCar["anio"] ?></li>

                        <li><b>PLACAS:</b><?php echo $currentCar["placas"] ?></li>
                        <li><b>USO:</b>Utilitario</li>
                        <li><b>FECHA ADQUISICIÓN: </b>05/04/2020</li>

                        <li><b>NUMERO DE SERIE: </b>00548-58479-15478-75498</li>
                        <li><b>FECHA DE VENCIMIENTO POLIZA: </b>05/11/2024</li>
                        <li><b>COMPAÑIA ASEGURADORA: </b>QUALITAS</li>

                        <li>



                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="openModal()">>
                                POLIZA DE SEGURO
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
                                                <img class="imagen-poliza" src="<?php $imagenesPoliza = json_decode($currentCar["imgPoliza"], true);
                                                                                echo $imagenesPoliza[0] ?>" alt="ImagenPoliza">
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
                    <a href="about-us.html" class="filled-button">Read More</a>
                </div>
            </div>
            <div class="col-md-6">
                <!-- CARRUSEL DE IMAGENES DEL VEHICULO PARA SABER EL ESTADO EN EL QUE SE ENCUENTRA -->
                <div class="banner header-text">
                    <div class="owl-banner owl-carousel">
                        <?php foreach (json_decode($currentCar["imgVehiculo"], true) as $img) : ?>
                            <div class="carrusel-inventario">
                                <img src=" <?php echo $img ?>" alt="">
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include '../php/php-utilidad/piePagina.php';
?>