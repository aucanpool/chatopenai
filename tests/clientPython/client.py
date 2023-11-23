import websocket
import ssl
import json

def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print("WebSocket error:", error)

def on_close(ws, a, b):
    print("WebSocket connection closed")

def on_open(ws):
    print("WebSocket connection opened")
    # Send a request after the connection is opened
    request = {
        "theme": "Christmas",
        "inspiration": "jingle bells",
        "groupName": "Mex",
        "groupMembers": "Angel, Allam, Wero and Pato",
        "highlights": "Angel got a new job, now Angel works for Banregio. Allam became a father for the first time. Wero and Pato took trip to Bacalar during summer"
        }
    ws.send(json.dumps(request))

if __name__ == "__main__":
    # Specify your WebSocket API Gateway endpoint URL
    websocket_url = "wss://djlco81wil.execute-api.us-east-1.amazonaws.com/dev"

    # Create a WebSocket connection
    
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(websocket_url,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    # Use SSL/TLS for secure WebSocket connection
    ws.on_open = on_open
    ws.run_forever()