import socketio
from wsgi import app  # a Flask, Django, etc. application

sio = socketio.Server()
app = socketio.WSGIApp(sio)


@sio.event 
def connect(sid,environ):
    print(sid,'connected') 

@sio.event 
def disconnect(sid):
    print(sid,'disconnected')
