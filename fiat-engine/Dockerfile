FROM python:3.6
ENV PYTHONUNBUFFERED 1

#mount our source code in the docker container
RUN mkdir /code
WORKDIR /code
ADD . /code/

#install dependencies
RUN apt-get install libmysqlclient-dev
RUN pip install -r requirements.txt

#set the entrypoint
CMD ["python", "main.py"]
