import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(3002,{cors:true})
export class EventsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    this.server.emit('message',payload)
  }

}
