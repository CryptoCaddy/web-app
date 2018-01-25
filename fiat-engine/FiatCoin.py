class FiatCoin(object):
    def __init__(self, exchange, crypto_currency, fiat_currency, timestamp, value):
        self.exchange = exchange
        self.crypto_currency = crypto_currency
        self.fiat_currency = fiat_currency
        self.timestamp = timestamp
        self.value = value