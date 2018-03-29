from flask import Flask, request
import random
from flask_jsonpify import jsonify

app = Flask(__name__)


@app.route('/api/convert/', methods=['POST'])
def request_conversions():

    conversions = []

    if request.is_json:
        the_request = request.get_json()
        conversion_requests = the_request['fiatCoins']
        for conversion_request in conversion_requests:
            conversion = convert(conversion_request)
            conversions.append(conversion)

    print (conversions)
    conversions = {'fiatCoins': conversions}

    response = jsonify(conversions)
    return response


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

@app.route('/api/getRandom/', methods=['GET'])
def getRandom():
    value = random.randint(1, 100)
    returnval = {'random_value': str(value)}
    print (returnval)
    returnval = jsonify(returnval)
    return returnval


#TODO: change to correct host and port
if __name__ == '__main__':
    app.run('0.0.0.0', 8000, debug=True)
    #app.run(host='localhost', port=7001)
