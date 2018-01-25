from flask import Flask, jsonify, request
import random
from FiatCoin import FiatCoin
from FiatExchange import FiatExchange

app = Flask(__name__)


@app.route('/api/convert/', methods=['POST'])
def request_conversions():

    fiatCoins = []

    if request.is_json:
        the_request = request.get_json()
        conversion_requests = the_request['fiatCoins']
        for conversion_request in conversion_requests:
            conversion = convert(conversion_request)
            fiatCoin = FiatCoin(conversion_request['exchange'], conversion['crypto_currency'], conversion['fiat_currency'], conversion['timestamp'], conversion['value'])
            fiatCoins.append(fiatCoin)

    fiatExchange = FiatExchange(fiatCoins)
    return jsonify(fiatExchange)

def convert(conversion_request):
    value = random.randint(1, 100)

    #TODO: changes timestamp and value datatypes to the correct ones
    conversion = {'exchange': conversion_request['exchange'],
                  'crypto_currency': conversion_request['crypto_currency'],
                  'fiat_currency': conversion_request['fiat_currency'],
                  'timestamp': conversion_request['timestamp'],
                  'value': str(value)}

    print (conversion)

    return conversion

#TODO: change to correct host and port
if __name__ == '__main__':
    app.run(host='localhost', port=7001)
