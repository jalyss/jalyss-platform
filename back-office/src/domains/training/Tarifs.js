import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 function Tarifs() {
  return ( <div>
    <div>
    <Button sx={{marginLeft:'850px'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          
        >
        add new tarif
        </Button>
    </div>
    <Box sx={{ width: '100%',marginTop:0 }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={5}>
       
    <Card sx={{ maxWidth: 345,maxHeight:500  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
        PLANW
49DT
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.


        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DELETE</Button>
        <Button size="small">UPDATE</Button>
      </CardActions>
    </Card>
   
      </Grid>
      <Grid item xs={5}>
         
    <Card sx={{ maxWidth: 345,maxHeight:500  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        PLANI
79DT
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.


        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DELETE</Button>
        <Button size="small">UPDATE</Button>
      </CardActions>
    </Card>
      </Grid>
      <Grid item xs={5}>
          
    <Card sx={{ maxWidth: 345,maxHeight:500  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        PLANS
109DT
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.


        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DELETE</Button>
        <Button size="small">UPDATE</Button>
      </CardActions>
    </Card>
      </Grid>
      <Grid item xs={5}>
            
    <Card sx={{ maxWidth: 345,maxHeight:500  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        PLANE
149DT 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.


        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DELETE</Button>
        <Button size="small">UPDATE</Button>
      </CardActions>
    </Card>
      </Grid>
    </Grid>
  </Box>
  </div>
  )
}
export default  Tarifs;