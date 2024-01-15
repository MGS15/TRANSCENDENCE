import { createContext } from 'react';
import {  Socket, io} from 'socket.io-client';

const socket:Socket  = io("ws://9alwa.ddns.net:3001", {autoConnect: false , transports: ['websocket']})
export const SocketContext = createContext<Socket>(socket)

