import React, { useEffect, useState } from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import gif from "assets/images/cardimgfree.png";
import Box from '@mui/material/Box';
import { fetchData } from "../../data/lineChartData";
import { onValue, ref } from "firebase/database";
import database from "../../data/database";
const WelcomeMark = () => {


  	 const [presionDeseada, setPresionDeseada] = useState(null);
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
console.log("TOLERANCIA",tolerancia);

  return (
    <Card sx={() => ({
      height: "auto",
      py: "32px",
      backgroundImage: `url(${gif})`,
      backgroundSize: "cover",
      backgroundPosition: "50%"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            Bienvenido de nuevo,
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
            Dr Antoine Ganem
          </VuiTypography>
          <VuiTypography color="white" variant="h6" fontWeight="bold" mb="18px">
           Aqui tiene toda la información que solicito de su paciente!
            <br /> Le deseamos un buen día.
          </VuiTypography>
          <VuiTypography color="black" variant="h6" fontWeight="regular" mb="auto">


 <Box sx={{ width: "70%",backgroundColor:"white !important", padding:5.5, borderRadius:"5%", maxHeight:"200px"}}>
    <h3 > Presión deseada: {presionDeseada<(dif/100)*20?(presionDeseada+(dif/100)*20):(presionDeseada-(dif/100)*20)}</h3>
<Slider min={0} max={20} aria-label="Default" value={presionDeseada<(dif/100)*20?(presionDeseada+(dif/100)*20):(presionDeseada-(dif/100)*20)} valueLabelDisplay="default" title={"Presión"} marks ={[
  {
    value: 0,
    label: '0 Newtons',
  }
  ,

  {
    value: 20,
    label: '20N~2kg',
  },
]}/> </Box>
            <Box sx={{ width: "70%",backgroundColor:"white !important", padding:5.5, borderRadius:"5%",topMargin:"15px",height:"auto"}}>
    <h3 > Tolerancia: {tolerancia}%</h3>
<Slider min={0} max={100} aria-label="Default" value={tolerancia} valueLabelDisplay="default" title={"Presión"} marks ={[
  {
    value: 0,
    label: '0 ',
  }
  ,

  {
    value: 100,
    label: '100%',
  },
]}/> </Box>
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          component="a"
          href="#"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Da click aquí para cambiar de paciente
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
