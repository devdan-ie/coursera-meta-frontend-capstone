import { ChakraProvider, HStack, VStack } from '@chakra-ui/react'
import logo from './assets/Logo.svg'
import menu from './assets/Menu.svg'
import basket from './assets/Basket.svg'

import './App.css';
import ReservationForm from './ReservationForm';




export default function App() {
    return (
        <ChakraProvider>
            <VStack>
                <HStack>
                    <img src={menu} />
                    <img src={logo} />
                    <img src={basket} />
                </HStack>
                <ReservationForm></ReservationForm>
            </VStack>
        </ChakraProvider>
    );
}
