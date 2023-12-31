# Spring Boot JSON API für React
Dieser Server liefert die benötigte REST API für das [React Frontend](https://gitlab.bht-berlin.de/s52888/moderne-webentwicklung-htmx/-/tree/main/forum-react/frontend?ref_type=heads).
## Installation
Das Aufsetzen des Servers kann mithilfe von Docker oder Maven erfolgen.
### Docker
Ein aktiver Docker Daemon ist benötigt, um den folgenden Befehl auszuführen.  
Führe im Verzeichnis dieser Readme `docker-compose up` aus.  
Der Server ist nun unter [http://localhost:5173/](http://localhost:5173/) erreichbar.

### Maven
Eine Maven Installation wird benötigt. [Hier](https://maven.apache.org/download.cgi?.) gibt es die aktuellste Version.  

Es wird ebenfalls eine aktive, auf `localhost:5432` laufende Postgres Datenbank mit dem Standarduser "postgres" und dem Standardpasswort "123" benötigt. Alternativ kann diese Konfiguration in den application.properties angepasst werden.  

Folgender Befehl startet einen postgres Docker Container mit entsprechender Konfiguration:
`docker run --name postgres -e POSTGRES_PASSWORD=123 -d postgres:alpine3.18`
  
Folgende Befehle müssen für die Installation und den Start des Servers ausgeführt werden:

   - `mvn clean install`
   - `cd target`
   - `java -jar backend-0.0.1-SNAPSHOT.jar`
    
Der Server ist nun unter [http://localhost:5173/](http://localhost:5173/) erreichbar.
