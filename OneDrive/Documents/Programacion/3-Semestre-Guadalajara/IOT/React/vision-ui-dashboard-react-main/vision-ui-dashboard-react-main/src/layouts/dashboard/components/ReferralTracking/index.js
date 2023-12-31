import React, { useEffect, useState } from "react";
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchData } from "../../data/lineChartData";
import { ref, onValue } from 'firebase/database'; // Import onValue function
import database from "../../data/database";
import VuiSwitch from "../../../../components/VuiSwitch";
function ReferralTracking() {

	const { info, gradients } = colors;
	const { cardContent } = gradients;

	 const [presion, setPresion] = useState(null);
	let path="SensorPresion/PresionActual"


  useEffect(() => {
    // Initiate data fetching
    fetchData(path)
      .then((initialData) => {
        setPresion(initialData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Set up a real-time listener for subsequent updates
    const dataRef = ref(database, path);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const updatedData = snapshot.val();
      setPresion(updatedData);
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once on mount


	console.log("PRESION", presion)
	return (
		<Card
			sx={{
				height: '100%',
				background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
			}}>
			<VuiBox sx={{ width: '100%' }}>
				<VuiBox
					display='flex'
					alignItems='center'
					justifyContent='space-beetween'
					sx={{ width: '100%' }}
					mb='40px'>
					<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
						Seguimiento paciente
					</VuiTypography>
					<VuiBox
						display='flex'
						justifyContent='center'
						alignItems='center'
						bgColor='#22234B'
						sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
						<FaEllipsisH color={info.main} size='18px' />
					</VuiBox>
				</VuiBox>
				<VuiBox
					display='flex'
					sx={({ breakpoints }) => ({
						[breakpoints.up('xs')]: {
							flexDirection: 'column',
							gap: '16px',
							justifyContent: 'center',
							alignItems: 'center'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}
					})}>
					<Stack
						direction='column'
						spacing='20px'
						width='500px'
						maxWidth='50%'
						sx={({ breakpoints }) => ({
							mr: 'auto',
							[breakpoints.only('md')]: {
								mr: '75px'
							},
							[breakpoints.only('xl')]: {
								width: '500px',
								maxWidth: '40%'
							}
						})}>
						<VuiBox
							display='flex'
							width='220px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
								Edad paciente
							</VuiTypography>

							<VuiTypography color='white' variant='lg' fontWeight='bold'>
								13
							</VuiTypography>
						</VuiBox>
						<VuiBox
							display='flex'
							width='220px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
								Santiago Gutierrez
							</VuiTypography>
							<VuiTypography color='white' fontSize="5px" fontWeight='bold'>

							</VuiTypography>
						</VuiBox>
						<VuiBox
							display='flex'
							width='220px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
								Sistema ON
							</VuiTypography>
							 <VuiSwitch color="info" checked={"SISTEMA ON"}  />
							<VuiTypography color='white' variant='lg' fontWeight='bold'>

							</VuiTypography>
						</VuiBox>
					</Stack>
					<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress
							variant='determinate'
							value={presion*5}
							size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
							color='success'
						/>
						<VuiBox
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiTypography color='text' variant='button' mb='4px'>
									Presion
								</VuiTypography>
								<VuiTypography
									color='white'
									variant='d5'
									fontWeight='bold'
									mb='4px'
									sx={({ breakpoints }) => ({
										[breakpoints.only('xl')]: {
											fontSize: '32px'
										}
									})}>
									{presion}
								</VuiTypography>
								<VuiTypography color='text' variant='button'>
									Sobre 20N~ 2000g
								</VuiTypography>
							</VuiBox>
						</VuiBox>
					</VuiBox>
				</VuiBox>
			</VuiBox>

		</Card>
	);
}

export default ReferralTracking;
