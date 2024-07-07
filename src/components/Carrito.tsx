import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { ICartItem } from './interface/ICartItem';
import { ICategory } from './interface/ICategory';

interface ICarritoProps {
  carrito: ICartItem[];
  setCarrito: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  SLS : (carrito : ICartItem[]) => void;
  GFLS : () =>ICartItem[];
}

export const Carrito: React.FC<ICarritoProps> = ({carrito,setCarrito,SLS,GFLS}) => {
  
  const getUniqueCategory = (carrito: ICartItem[]): ICategory[] => {
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

  const categoryUniqueInCart = getUniqueCategory(carrito);
  

  return (
    <List
    sx={{
      width: '100%',
      height:'60vh',
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
          {carrito.map((item) => ( item.item.product.categoryId === category.id ?
          
            <ListItem key={item.item.id}>
              <ListItemText primary={item.item.product.name}/>
            </ListItem>
            : null
          ))}
        </ul>
      </li>
    ))}
  </List>
   
  );
}
