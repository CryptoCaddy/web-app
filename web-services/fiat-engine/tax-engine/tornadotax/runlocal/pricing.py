#!/usr/bin/env python
#Copyright (c) 2018 Daniel B. Grunberg
#
#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU Affero General Public License version 3 as published by
#the Free Software Foundation.
#
#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.
#
#You should have received a copy of the GNU Affero General Public License
#along with this program.  If not, see <http://www.gnu.org/licenses/>.

'''
Function to get price of a crypto currency at a certain date
Currently uses  CryptoCompare API - free (at the moment).
This program caches its results into a sqlite database, so that repeated runs of the
program will not overtax the API.

storing the database in prices.sqlite
'''
import os
import datetime
import sqlitedict
import requests
import sys

file='prices.sqlite'
#we store the cached data in a dict with key sym+date, with date in
#format YEAR-MON-DAY
#Once you have instantiated a Price() object, you can call Price.get_price
#function instead of price.get_price, so no object ref required.  This is needed since
#we have to pass a callback function to our Tax object.

class Price():
    theObj=None
    def __init__(self):
        #opens the database
        self.db=sqlitedict.SqliteDict(file, autocommit=True, tablename='crypto')
        print('opened cache db, {} entries'.format(len(self.db)))
        Price.theObj=self
        self.cached=0
        self.requests=0
        print('Using the free API for historical prices at cryptocompare.com')
        
    @staticmethod
    def get_price(sym, date):
        return Price.theObj.get_price(sym, date)
        
    @staticmethod
    def key(sym, date):
        dtstr=date.strftime('%Y-%m-%d')
        return sym+'~'+dtstr
    
    @staticmethod
    def dtstr(dt):
        return dt.strftime('%m/%d/%Y %H:%M:%S')

    def close(self):
        self.db.close()

    
    @staticmethod
    def get_price(sym, date):
        k=Price.key(sym,date)
        db=Price.theObj.db
        if k in db:
            Price.theObj.cached+=1
            return db[k]
        ts=int(date.timestamp())
        #print('ts={}'.format(ts))
        exch='CCCAGG'
        req='https://min-api.cryptocompare.com/data/pricehistorical?fsym={}&tsyms=USD&ts={}&e={}'.format(sym,ts,exch)
        #print('req={}'.format(req))
        r=requests.get(req)
        z=r.json() #Python object
        try:
            price=z[sym]['USD']
        except Exception as ex:
            print('Exception in pricing: {} {} returned {}'.format(ex,req,z))
            raise(ex)
        db[k]=price  #save for next time
        Price.theObj.requests+=1
        return price

    def get_counts(self):
        return self.requests, self.cached
    #dt_to=datetime.datetime.fromtimestamp(z['TimeTo'])
    #dt_from=datetime.datetime.fromtimestamp(z['TimeFrom'])
    #print('TimeTo={}'.format(dtstr(dt_to)))
    #print('TimeFrom={}'.format(dtstr(dt_from)))
    #for p in z['Data']:
    #    dt=datetime.datetime.fromtimestamp(p['time'])
    #    high=p['high']
    #    low=p['low']
    #    print('{} {} {}'.format(dtstr(dt),low,high))
    #def __del__(self):
    #    print('in __del__')
    #    self.db.close()
    #    print('closed db')
    
if __name__=='__main__':
    price=Price()
    p=Price.get_price('BTC',datetime.datetime(2018,3,14, 12, 0, 0))  #try noon
    print('price={}'.format(p))
    price.close()
    
    
