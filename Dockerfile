FROM node:12.13.0-alpine
LABEL maintainer "saprasa2@cisco.com"


WORKDIR ${HOME}/repo/

# Install Mean.JS Prerequisites
RUN npm install -g @angular/cli && npm install -g nodemon

# Install Mean.JS packages
ADD package.json ${HOME}/repo/package.json
#Required for npm ci
ADD package-lock.json ${HOME}/repo/package-lock.json
#Perform Clean Install (clean the node modules)
RUN npm ci


# Make everything available for start
ADD . ${HOME}/repo/

RUN ng build --progress

# Set environment

# USER default

# Store the timestamp of the build
RUN date -Iseconds > sre_docker_image_build_date.txt

EXPOSE 8080
CMD ["nodemon"]
