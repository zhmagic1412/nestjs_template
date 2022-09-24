docker rm -f nest_test
docker build -t nest_test .
docker run --name nest_test -p 3001:3001 -d nest_test
