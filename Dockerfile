FROM node:12.2.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
ARG REACT_APP_VALIDATOR_API_HOST
ENV REACT_APP_VALIDATOR_API_HOST=${REACT_APP_VALIDATOR_API_HOST}
RUN npm run build
#ngnix
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
#RUN rm /etc/ngnix/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]