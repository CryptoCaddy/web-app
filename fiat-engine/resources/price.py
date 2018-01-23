from flask_restful import Resource
from flask_jsonpify import jsonify
import random


class Price(Resource):
    def get(self, exchange, crypto_currency, fiat_currency, timestamp):
        # TODO: get actual historical data. currently this returns a random number for value
        value = random.randint(1, 100)

        result = {'exchange': exchange,
                  'crypto_currency': crypto_currency,
                  'fiat_currency': fiat_currency,
                  'timestamp': timestamp,
                  'value': value}

        return jsonify(result)
