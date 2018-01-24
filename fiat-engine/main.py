from flask import Flask
from flask_restful import Api
from resources import Price

app = Flask(__name__)
api = Api(app)


api.add_resource(Price, '/<exchange>/<crypto_currency>/<fiat_currency>/<timestamp>')


if __name__ == '__main__':
    app.run()
