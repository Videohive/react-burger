import type { Middleware } from "redux";
import { RootState } from "../types";
import { TWSOrderActions } from "../../utils/types";

export const socketMiddleware = (
  wsActions: TWSOrderActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let closing: boolean = false;
    const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action as { type: string; payload: any };

      if (type === wsInit) {
        socket = new WebSocket(payload);
        url = payload;
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };

        socket.onclose = (event) => {
          if (closing) {
            dispatch({ type: onClose, payload: event });
          } else {
            dispatch({ type: wsInit, payload: url });
          }
        };
      }

      if (wsClose && type === wsClose && socket) {
        closing = true;
        socket.close();
      }

      next(action);
    };
  };
};
