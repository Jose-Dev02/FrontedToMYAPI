
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { ICartItem } from './interface/ICartItem';
import { ICategory } from './interface/ICategory';
import { Divider, ListItemSecondaryAction, IconButton,Dialog,TextField ,DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import styled from '@emotion/styled';

export const QuantityInput = styled(TextField)`
  & input[type=number] {
    -moz-appearance: textfield;
  }
  & input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;



interface ICarritoProps {
  carrito: ICartItem[];
  setCarrito: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  SLS: (carrito: ICartItem[]) => void;
 // GFLS: () => ICartItem[];
}

export const Carrito: React.FC<ICarritoProps> = ({ carrito, setCarrito, SLS }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<ICartItem | null>(null);


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToRemove(null);
  };

  const handleRemoveItem = () => {
    if (itemToRemove) {
      setCarrito(prevCarrito =>{
        const localCarrito = prevCarrito.filter(item => item.item.id !== itemToRemove.item.id);
        SLS(localCarrito);
        return localCarrito;
      }
      );
      handleCloseDialog();
    }
  };

  const handleAdjustQuantity = (item: ICartItem, amount: number) => {
    const updatedCarrito = carrito.map(cartItem =>
      cartItem.item.id === item.item.id ? { ...cartItem, quantity: cartItem.quantity + amount } : cartItem
    );
    setCarrito(updatedCarrito);
    SLS(updatedCarrito); // Guardar en localStorage aquí si es necesario
  };

  const confirmRemoveItem = (item: ICartItem) => {
    setItemToRemove(item);
    setOpenDialog(true);
  };

  const getUniqueCategories = (carrito: ICartItem[]): ICategory[] => {
    const uniqueCategories = new Set<number>();
    const categories: ICategory[] = [];
    carrito.forEach(car => {
      const category = car.item.product.category;
      if (!uniqueCategories.has(category.id)) {
        uniqueCategories.add(category.id);
        categories.push(category);
      }
    });
    return categories;
  };

  const categoryUniqueInCart = getUniqueCategories(carrito);

  return (
    <List
      sx={{
        width: '100%',
        height: '60vh',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2), -1px 1px 3px rgba(0, 0, 0, 0.2)'
      }}
      subheader={<li />}
    >
      {categoryUniqueInCart.map((category) => (
        <li key={category.id}>
          <ul>
            <ListSubheader>{category.name}</ListSubheader>
            {carrito.map((item) => (
              item.item.product.categoryId === category.id &&
              <ListItem key={item.item.id}>
                <ListItemText primary={item.item.product.name} secondary={`${item.item.product.price}$`} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() => handleAdjustQuantity(item, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <QuantityInput
                    variant="outlined"
                    size="small"
                    type="number"                                      
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        handleAdjustQuantity(item, newQuantity - item.quantity);
                      }
                    }}
                    sx={{ width: '18%', textAlign: 'center' }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => handleAdjustQuantity(item, 1)}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => confirmRemoveItem(item)}
                  >
                    <Delete color='' />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </ul>
          <Divider component="ul" />
        </li>
      ))}
      {/* Confirmación para eliminar item del carrito */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro que deseas eliminar este item del carrito?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemoveItem} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};


