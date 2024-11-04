cd .\face_reco_linux\
docker-compose up -d

cd ..\front\package\
start ng serve

cd ..\..\back\suiviAbsence\

:: Run the Spring Boot application directly with Java
start "" "C:\Program Files\Java\jdk-22\bin\java.exe" -jar .\target\suiviAbsence-0.0.1-SNAPSHOT.jar
