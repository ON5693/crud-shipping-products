import axios from 'axios';
import { OrdersDto } from './types/types';
import config from '../utils/config';

const baseurl = `${config.PRODUCTS_SERVICE_URL}/products`;

export const addOrder = async (id: string, order: OrdersDto) => {
    const url = `${baseurl}/${id}`;
    const product = await axios.get(url);

    const { stock } = product.data;
    if (stock < order.quantity) {
        throw new Error('Not enough stock');
    }
    const updatedStock = stock - order.quantity;
    await axios.patch(url, { stock: updatedStock });
};
export const shippingOrder = async (id: string, destination: string) => {
    const address = {
        from: config.CEP_ORIGIN,
        to: destination,
    }
    
    if (!process.env.SHIPPING_TOKEN) {
        // const url = `${baseurl}/${id}/shipping`;
        // const { data } = await axios.post(url, address);
        // return data;
        throw new Error('SHIPPING_TOKEN not found');
    } else {
        try {
        const url = `https://melhorenvio.com.br/api/v2/me/shipment/calculate`;
        const product = await axios.get(`${baseurl}/${id}`)
        const { weight, dimensions } = product.data;
        const input = {
            from: {
                postal_code: address.from
            },
            to: {
                postal_code: address.to
            },
            package: {
                height: dimensions.height,
                width: dimensions.width,
                length: dimensions.length,
                weight
            },
        }
        const response = await axios.post(url, input,  { 
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${process.env.SHIPPING_TOKEN}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Aplicação teste.email@gmail.com'
            }
        });
        
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching shipping information');
    }
}
};