import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './components/navbar';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { Status } from './components/stepper';
import axios from 'axios';
import { Predictiontable } from './components/table';

function App() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [pred, setPred] = useState([]);

  const handleClick = async () => {
    setLoading(true);
    await axios.get('http://localhost:5000/startCapture')
    .then(async (res) => {
      if(res.data.msg === 'ok') {
        setActive(1);
        for(let i=1;i<6;i++) {
          await axios.get('http://localhost:5000/getCapturedImage', {
            params: {
              filename: i
            },
            responseType: 'blob'
          })
          .then(async (res) => {
            const blob = new File([await res.data], i.toString()+'.jpg');
            const url = URL.createObjectURL(blob);
            setData(arr => [...arr, url])
            setActive(2);
            await axios.get('http://localhost:5000/getPrediction', {
              params: {
                filename: i
              }
            })
            .then((res) => {
              setPred(arr => [...arr, {
                'img': i,
                'statement': res.data.res
              }])
              setActive(3);
            })
            .catch((err) => {
              console.error(err);
            })
          })
          .catch((err) => {
            console.error(err);
          })
        }
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    if(pred.length === 5) {
      setLoading(false);
      setActive(0);
    }
  }, [pred.length])

  return (
    <div className="App">
      <Navbar />
      <div
        className='container'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '15vh'
        }}
      >
        <Box>
          <Button 
            variant="contained"
            onClick={handleClick}
          >Click to start</Button>
        </Box>
        <Box 
          style={{
            marginTop: '5vh',
            marginBottom: '3vh'
          }}
        >
          {
            loading ?
              <Box 
                sx={{ width: '100%'}}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:'center',
                  flexDirection: 'column'
                }}
              >
                <Status 
                  active={active}
                />
                <LinearProgress
                  style={{
                    width: '20vw',
                    marginTop: '10vh'
                  }} />
              </Box>
            :
              pred.length === 5 ? <Box
                  style={{
                    width: '100%',
                  }}
              >
                <Typography 
                  variant='body1' 
                  style={{
                    fontSize: '1.5em',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  Captured Images
                </Typography>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1vh',
                    overflowX: 'scroll',
                    width: '650px',
                  }}
                >
                  {
                    data.map((d,k) => {
                      return (
                        <Box key={k}>
                          <img 
                            src={d} 
                            alt={'fetched'} 
                            style={{
                              height: '250px',
                              width: '250px'
                            }}
                          />
                        </Box>
                      )
                    })
                  }
                </Box>
                <Typography
                  variant='body1'
                  style={{
                    fontSize: '1.5em',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  Prediction results
                </Typography>
                <Predictiontable pred={pred} />
              </Box>
              :
              null
          }
        </Box>
      </div>
    </div>
  );
}

export default App;
