/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, useState } from "react";
import { Card, Stack, Grid } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import GreenLightning from 'assets/images/shapes/green-lightning.svg';
import WhiteLightning from 'assets/images/shapes/white-lightning.svg';
import linearGradient from 'assets/theme/functions/linearGradient';
import colors from 'assets/theme/base/colors';
import carProfile from 'assets/images/shapes/1294818.svg';
import LineChart from 'examples/Charts/LineCharts/LineChart';
import { lineChartDataProfile1, lineChartDataProfile2 } from 'variables/charts';
import { lineChartOptionsProfile2, lineChartOptionsProfile1 } from 'variables/charts';
import CircularProgress from '@mui/material/CircularProgress';


import { fetchData } from "../../../dashboard/data/lineChartData";
import { onValue, ref } from "firebase/database";
import database from "../../../dashboard/data/database";

const CarInformations = () => {
	const { gradients, info } = colors;
	const { cardContent } = gradients;
 const [presion, setPresionDeseada] = useState(null);
      const [tolerancia, setTolerancia] = useState(null);
       const [dif, setDif] = useState(null);
	let path="SensorPresion/PresionActual"
  let path2="SensorPresion/tolerancia"
  let path3="SensorPresion/diferenciaPresionActual"

  useEffect(() => {
    // Initiate data fetching
    fetchData(path)
      .then((initialData) => {
        setPresionDeseada(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetchData(path2)
      .then((initialData) => {
        setTolerancia(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
       fetchData(path3)
      .then((initialData) => {
        setDif(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Set up a real-time listener for subsequent updates
    const dataRef = ref(database, path);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const updatedData = snapshot.val();
      setPresionDeseada(updatedData);
    });
    const dataRef2 = ref(database, path2);
    const unsubscribe2 = onValue(dataRef2, (snapshot) => {
      const updatedData = snapshot.val();
      setTolerancia(updatedData);
    });
     const dataRef3 = ref(database, path3);
    const unsubscribe3 = onValue(dataRef3, (snapshot) => {
      const updatedData = snapshot.val();
      setDif(updatedData);
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };

  }, []); // Empty dependency array means this effect runs once on mount

	return (
		<Card
			sx={({ breakpoints }) => ({
				[breakpoints.up('xxl')]: {
					maxHeight: '400px',
					backgroundColor:"#ffffff !important"
				}
			})}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='6px'>
					Información del corsé
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='30px'>
					Todas las alertas e información relevante del corse se encuentran a continuación
				</VuiTypography>
				<Stack
					spacing='24px'
					background='#fff'
					sx={({ breakpoints }) => ({
						[breakpoints.up('sm')]: {
							flexDirection: 'column'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row'
						},
						[breakpoints.only('xl')]: {
							flexDirection: 'column'
						}
					})}>
					<VuiBox
						display='flex'
						flexDirection='column'
						justifyContent='center'
						sx={({ breakpoints }) => ({
							[breakpoints.only('sm')]: {
								alignItems: 'center'
							}
						})}
						alignItems='center'>
						<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
							<CircularProgress variant='determinate' value={presion*5} size={150} color='info' />
							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiBox component='img' src={GreenLightning} />
								<VuiTypography color='white' variant='h2' mt='3px' fontWeight='bold' mb='2px'>
									{presion}
								</VuiTypography>
								<VuiTypography color='text' variant='caption'>
									Presión actual
								</VuiTypography>
							</VuiBox>
						</VuiBox>
						<VuiBox
							display='flex'
							justifyContent='center'
							flexDirection='column'
							sx={{ textAlign: 'center' }}>
							<VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
								{presion<(dif/100)*20?(presion+(dif/100)*20):(presion-(dif/100)*20)}
							</VuiTypography>
							<VuiTypography color='text' variant='button' fontWeight='regular'>
								Presión deseada
							</VuiTypography>
						</VuiBox>
					</VuiBox>
					<Grid
						container
						sx={({ breakpoints }) => ({
							spacing: '24px',
							[breakpoints.only('sm')]: {
								columnGap: '0px',
								rowGap: '24px'
							},
							[breakpoints.up('md')]: {
								gap: '24px',
								ml: '50px !important'
							},
							[breakpoints.only('xl')]: {
								gap: '12px',
								mx: 'auto !important'
							}
						})}>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									minHeight: '110px',
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Tolerancia actual
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										{tolerancia}%
									</VuiTypography>
								</VuiBox>
								<VuiBox
									display='flex'
									justifyContent='center'
									alignItems='center'
									sx={{
										background: info.main,
										borderRadius: '12px',
										width: '56px',
										height: '56px'
									}}>
									<VuiBox component='img' src={carProfile} />
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Dif. presión
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										{dif}%
									</VuiTypography>
								</VuiBox>
								<VuiBox sx={{ maxHeight: '75px' }}>
									<LineChart
										lineChartData={lineChartDataProfile1}
										lineChartOptions={lineChartOptionsProfile1}
									/>
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									minHeight: '110px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Estado:
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										{dif>tolerancia?"⚠️ Alerta presion":" ✅Todo en orden"}
									</VuiTypography>
								</VuiBox>
								<VuiBox
									display='flex'
									justifyContent='center'
									alignItems='center'
									sx={{
										background: info.main,
										borderRadius: '12px',
										width: '56px',
										height: '56px'
									}}>
									<VuiBox component='img' src={WhiteLightning} />
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Num Alertas
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										140
									</VuiTypography>
								</VuiBox>
								<VuiBox sx={{ maxHeight: '75px' }}>
									<LineChart
										lineChartData={lineChartDataProfile2}
										lineChartOptions={lineChartOptionsProfile2}
									/>
								</VuiBox>
							</VuiBox>
						</Grid>
					</Grid>
				</Stack>
			</VuiBox>
		</Card>
	);
};
export const InfoPulsera = () => {
	const { gradients, info } = colors;
	const { cardContent } = gradients;

	const simulateHeartbeat = () => {
    const heartbeatElement = document.getElementById('heartbeat');
    if (heartbeatElement) {
      heartbeatElement.classList.add('heartbeat-animation');
      setTimeout(() => {
        heartbeatElement.classList.remove('heartbeat-animation');
      }, 60000 / pulso);
    }
  };


  const heartbeatStyle = {
    fontSize: '24px',
  };

  const heartbeatAnimationStyle = {
    transform: 'scale(1.3)',
    transition: 'transform 0.3s ease-in-out',
  };

	const [pulso, setPresionDeseada] = useState(null);
      const [tolerancia, setTolerancia] = useState(null);
       const [dif, setDif] = useState(null);
	let path="SensorPulso/PulsoActual"
  let path2="SensorPresion/tolerancia"
  let path3="SensorPresion/diferenciaPresionActual"

  useEffect(() => {

    // Initiate data fetching
    fetchData(path)
      .then((initialData) => {
        setPresionDeseada(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetchData(path2)
      .then((initialData) => {
        setTolerancia(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
       fetchData(path3)
      .then((initialData) => {
        setDif(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Set up a real-time listener for subsequent updates
    const dataRef = ref(database, path);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const updatedData = snapshot.val();
      setPresionDeseada(updatedData);
    });
    const dataRef2 = ref(database, path2);
    const unsubscribe2 = onValue(dataRef2, (snapshot) => {
      const updatedData = snapshot.val();
      setTolerancia(updatedData);
    });
     const dataRef3 = ref(database, path3);
    const unsubscribe3 = onValue(dataRef3, (snapshot) => {
      const updatedData = snapshot.val();
      setDif(updatedData);
    });
	const intervalId = setInterval(simulateHeartbeat, 60000 / pulso);
    return () => clearInterval(intervalId);
    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };

  }, []);

	return (
		<Card
			sx={({ breakpoints }) => ({
				[breakpoints.up('xxl')]: {
					maxHeight: '400px'
				}
			})}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='6px'>
					Información de la pulsera
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='30px'>
					Bienvenido, a continuación puedes ver un resumen de la información de tu dispositivo.
				</VuiTypography>
				<Stack
					spacing='24px'
					background='#fff'
					sx={({ breakpoints }) => ({
						[breakpoints.up('sm')]: {
							flexDirection: 'column'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row'
						},
						[breakpoints.only('xl')]: {
							flexDirection: 'column'
						}
					})}>
					<VuiBox
						display='flex'
						flexDirection='column'
						justifyContent='center'
						sx={({ breakpoints }) => ({
							[breakpoints.only('sm')]: {
								alignItems: 'center'
							}
						})}
						alignItems='center'>
						<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>

							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

								<VuiTypography color='white' variant='h2' mt='6px' fontWeight='bold' mb='4px'>

									<div id="heartbeat" style={{ ...heartbeatStyle, ...(pulso && heartbeatAnimationStyle) }}>
        {pulso}♥️
      </div>
								</VuiTypography>
								<VuiTypography color='text' variant='caption'>
Pulso cardíaco
								</VuiTypography>
							</VuiBox>
						</VuiBox>
						<VuiBox
							display='flex'
							justifyContent='center'
							flexDirection='column'
							sx={{ textAlign: 'center' }}>
							<VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
								0h 01 min
							</VuiTypography>
							<VuiTypography color='text' variant='button' fontWeight='regular'>
								Tiempo de trackeo continuo
							</VuiTypography>
						</VuiBox>
					</VuiBox>
					<Grid
						container
						sx={({ breakpoints }) => ({
							spacing: '24px',
							[breakpoints.only('sm')]: {
								columnGap: '0px',
								rowGap: '24px'
							},
							[breakpoints.up('md')]: {
								gap: '24px',
								ml: '50px !important'
							},
							[breakpoints.only('xl')]: {
								gap: '12px',
								mx: 'auto !important'
							}
						})}>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									minHeight: '110px',
									borderRadius: '20px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Porcentaje de uso
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										7%
									</VuiTypography>
								</VuiBox>
								<VuiBox
									display='flex'
									justifyContent='center'
									alignItems='center'
									sx={{
										background: info.main,
										borderRadius: '12px',
										width: '56px',
										height: '56px'
									}}>
									<VuiBox component='img' src={carProfile} />
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>

						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
							<VuiBox
								display='flex'
								p='18px'
								alignItems='center'
								sx={{
									background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
									borderRadius: '20px',
									minHeight: '110px'
								}}>
								<VuiBox display='flex' flexDirection='column' mr='auto'>
									<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
										Estado:
									</VuiTypography>
									<VuiTypography
										color='white'
										variant='h4'
										fontWeight='bold'
										sx={({ breakpoints }) => ({
											[breakpoints.only('xl')]: {
												fontSize: '20px'
											}
										})}>
										{dif>tolerancia?"⚠️ Alerta presion":" ✅Todo en orden"}
									</VuiTypography>
								</VuiBox>
								<VuiBox
									display='flex'
									justifyContent='center'
									alignItems='center'
									sx={{
										background: info.main,
										borderRadius: '12px',
										width: '56px',
										height: '56px'
									}}>
									<VuiBox component='img' src={WhiteLightning} />
								</VuiBox>
							</VuiBox>
						</Grid>
						<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
						</Grid>
					</Grid>
				</Stack>
			</VuiBox>
		</Card>
	);
};
export default CarInformations;
