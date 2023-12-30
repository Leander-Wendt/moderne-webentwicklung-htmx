# HTMX & Spring Boot

## Installation
### Docker
Ein aktiver Docker Daemon ist benötigt, um den folgenden Befehl auszuführen.
Führe im Verzeichnis dieser Readme `docker-compose up` aus.  
Der Server ist nun unter [http://localhost:8080](http://localhost:8080) erreichbar.

### Maven
Eine Maven Installation wird benötigt. [Hier](https://maven.apache.org/download.cgi?.) gibt es die aktuellste Version.  

Es wird ebenfalls eine aktive, auf `localhost:5432` laufende Postgres Datenbank mit dem Standarduser "postgres" und dem Standardpasswort "123" benötigt. Alternativ kann diese Konfiguration in den application.properties angepasst werden.  

Folgender Befehl startet einen postgres Docker Container mit entsprechender Konfiguration:  
`docker run --name postgres -e POSTGRES_PASSWORD=123 -d postgres:alpine3.18`
  
Folgende Befehle müssen für die Installation und den Start ausgeführt werden:

   - `mvn clean install`
   - `cd target`
   - `java -jar backend-0.0.1-SNAPSHOT.jar`
    
Der Server ist nun unter [http://localhost:8080](http://localhost:8080) erreichbar.
