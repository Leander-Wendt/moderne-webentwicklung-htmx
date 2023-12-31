# React Frontend
Das Aufsetzen des Servers kann mithilfe von Docker oder Node erfolgen.
## Installation
### Docker
Ein aktiver Docker Daemon ist benötigt, um den folgenden Befehl auszuführen.  
Führe im Verzeichnis dieser Readme `docker-compose up` aus.   
Der Server ist nun unter [http://localhost:5173](http://localhost:5173) erreichbar.

### Node 
Eine Node Installation wird benötigt. [Hier](https://nodejs.org/en/download) gibt es die aktuellste Version.  

Es wird ebenfalls eine aktiver [Backendserver](https://gitlab.bht-berlin.de/s52888/moderne-webentwicklung-htmx/-/tree/main/forum-react/backend?ref_type=heads) benötigt.
  
Folgende Befehle müssen für die Installation und den Start ausgeführt werden:

   - `npm install`
   - `npm run dev`
 
 Alternativ kann yarn verwendet werden: 
 - `yarn`
- `yarn dev`
    
Der Server ist nun unter [http://localhost:5173](http://localhost:5173) erreichbar.
