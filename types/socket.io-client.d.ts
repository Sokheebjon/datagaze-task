declare module "socket.io-client" {
    // Options for the client connection in Socket.io v2.5
    interface SocketIOClientOptions {
        reconnection?: boolean;               // Enable or disable automatic reconnection
        reconnectionAttempts?: number;        // Number of attempts before giving up
        reconnectionDelay?: number;           // Delay between reconnection attempts (in milliseconds)
        reconnectionDelayMax?: number;        // Maximum delay for reconnections (backoff)
        randomizationFactor?: number;         // Randomization factor for reconnection delay
        timeout?: number;                     // Connection timeout (in milliseconds)
        autoConnect?: boolean;                // Automatically connect upon instantiation
        forceNew?: boolean;                   // Whether to reuse existing connection
        transports?: string[];                // Transport mechanisms (e.g., polling, websocket)
        query?: { [key: string]: string };    // Additional query parameters sent with connection
    }

    // Interface representing a single socket connection
    interface Socket {
        id?: string;                          // The unique ID of the socket (optional, not defined until connection)
        connected: boolean;                   // Whether the socket is connected
        disconnected: boolean;                // Whether the socket is disconnected

        // Emit an event with optional arguments
        emit(event: string, ...args: any[]): this;

        // Listen for events with a callback
        on(event: string, callback: (data: any) => void): this;

        // Special event listener overloads for common error events
        on(event: "connect" | "disconnect" | "connect_error" | "connect_timeout" | "error", callback: (err?: any) => void): this;

        // Manually establish the connection (if autoConnect is false)
        connect(): this;

        // Manually disconnect the socket
        disconnect(): this;
    }

    // Main `io` function for creating a client-side socket connection
    function io(url: string, options?: SocketIOClientOptions): Socket;

    // Allow the io function to be imported
    export = io;
}
