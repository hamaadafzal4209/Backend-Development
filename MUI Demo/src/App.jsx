import { Typography, Container, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, AppBar, Toolbar, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <CameraAltIcon />
          <Typography variant='h6'>
            Photo Album
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth='sm'>
            <Typography variant='h2' align='center' color='textPrimary' gutterBottom >
              Photo Album
            </Typography>
            <Typography variant='h5' align='center' color='textSecondary' paragraph >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, provident incidunt rem magni in velit laudantium nostrum adipisci dolores perspiciatis? 
            </Typography>
          </Container>
        </div>
      </main>
    </>
  );
}

export default App;
