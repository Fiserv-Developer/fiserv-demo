import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import BodyElement from "../BodyElement";
import StarIcon from '@mui/icons-material/Star';

export default function Product(props) {
  const theme = useTheme();
  const buttons = props.isInBasket(props.product.name) ? 
    (
      <Box sx={{display: 'flex', margin: '0 auto'}}>
        <Button onClick={() => props.decreaseQuantity(props.product.name)}>-</Button>
        <Typography sx={{lineHeight: '36.5px', height: '36.5px'}}>{props.countInBasket(props.product.name)}</Typography>
        <Button onClick={() => props.increaseQuantity(props.product.name)}>+</Button>
      </Box>
    ) : (
      <Button onClick={() => props.addItem(props.product)}>Add</Button>
    );

  const featuredText = props.product.featured ? 
    (
      <Typography variant="h7" sx={{marginTop: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}><StarIcon />Best Seller</Typography>
    ) : (<Typography variant="h7" sx={{marginTop: '33px'}}></Typography>);

  return (
    <BodyElement key={props.product.name} xs={12} md={props.product.featured ? 6 : 4} lg={props.product.featured ? 6 : 4} xl={2} styleOverrides={{paddingLeft: '10px', paddingRight: '10px'}}>
      <img alt={props.product.name + " product image"} src={ "../shop/products/" + props.product.image } style={{objectFit: 'cover', width: '100%', height: '100%', minHeight: '50%'}} />
      {featuredText}
      <Typography variant="h6">{props.product.name}</Typography>
      <Typography variant="p" sx={{ color: theme.palette.text.secondary }}>{props.product.description}</Typography>
      <Typography variant="p" sx={{textAlign: 'right'}}>£{props.product.value}</Typography>
      <Divider />
      {buttons}
    </BodyElement>
  );
}