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
Crypto tax calculations
'''
import csv
#import numpy as np
#import pandas as pd
#import sys
import os
import argparse
import datetime
#from . import tax
'''
Format for Simple file, same as tx object format (except for datetime)
date (12/01/2018)
time (23:01:10)
account:
txid
action: DEP,BUY,SELL,WD,INIT,MINE  #INIT is a start (basically like a DEP), gross gives basis
pair:   trading pair from the exchange, not used for anything here
sym:    the symbol that BUY/SELL/MINE/INIT applies to.  Never fiat
symopp: the opposing symbol.  Could be fiat, e.g. USD.  for INIT, should be fiat
gross:  in symopp, total price paid or received. (not used for MINE)
quantity: number of sym
fee:    in symopp (not used for MINE)
address:for WD transactions.  Can be an account name or bitcoin address, etc.
note:   some text taken from the file
'''
class Obj:
    def __str__(self):
        return str(self.__dict__)
    
class Importer:
    #derive from this and implement the parse function, which takes a line from the csv file
    #and returns an object with the attributes for the standard transaction
    #NOTE: should it be an dict instead?
    def __init__(self):
        pass
    
    def parse(self, line, account=None):
        #parse a line, acct is a string that identifies this account
        assert('must implement in derived class')
        ret=Obj()
        ret.dt=None
        ret.txid=None
        ret.action=None
        ret.pair=None
        ret.sym=None
        ret.symopp=None
        ret.gross=None         #:  in symopp, total price paid or received
        ret.quantity=None      #amount in sym (DEP/WD also)
        ret.fee=None           #:    in symopp
        ret.address=None       #for WD transactions.  Can be an account name or bitcoin address, etc.
        ret.note=None          #some text taken from the file
        ret.blockchain_tx=None #transaction on a blockchain for WD or DEP

class Gdax(Importer):
    pass

class Gemini(Importer):
    def amt(self,s):
        #Gemini: convert string with $ in front to float, also () for negative, remove BTC/ETH
        #and commas.  Who do they think they are?
        #print('in amt: {}'.format(s))
        s=s.replace(',','')
        if s[0]=='(' and s[-1]==')':
            return -self.amt(s[1:-1])
        if s[0]=='$':
            return float(s[1:])
        if ' BTC' in s:
            return float(s.split()[0])
        if ' ETH' in s:
            return float(s.split()[0])
        return float(s)
        
    def parse(self, row, account='gemini'):
        #parse a row and set acct
        ret=Obj()
        if row[7]=='Totals':
            return None  #Last line of file
        dtstr=row[0]+' '+row[1]
        dttime=datetime.datetime.strptime(dtstr, '%Y-%m-%d %H:%M:%S.%f')  # note microseconds
        ret.dt=dttime
        ret.txid=None
        ret.account=account
        t=row[2]
        if t=='Buy':
            action='BUY'
        elif t=='Credit':
            action='DEP'
        elif t=='Sell':
            action='SELL'
        elif t=='Debit':
            action='WD'
        ret.action=action
        ret.pair=None
        ret.sym=None
        ret.symopp=None
        ret.gross=None   #:  in symopp, total price paid or received
        ret.quantity=None
        ret.fee=None     #:    in symopp
        ret.address=None #for WD transactions.  Can be an account name or bitcoin address, etc.
        ret.note=None    #some text taken from the file
        ret.note=row[4]
        ret.blockchain_tx=row[21]
        if action in ['BUY', 'SELL']:
            if row[3]=='BTCUSD':
                ret.sym='BTC'
                ret.symopp='USD'
            elif row[3]=='ETHUSD':
                ret.sym='ETH'
                ret.symopp='USD'
            else:
                print('unknow symbol:{} {}'.format(row[3], row))
                return None
            ret.gross=abs(self.amt(row[7]))
            ret.fee=abs(self.amt(row[8]))
            if ret.sym=='BTC':
                ret.quantity=abs(self.amt(row[10]))
            elif ret.sym=='ETH':
                ret.quantity=abs(self.amt(row[13]))
            else:
                print('ERROR 222')
                return None
        else:
            #Credit/Debit
            ret.sym=row[3]
            ret.symopp=None
            if ret.sym=='USD':
                ret.quantity=abs(self.amt(row[7]))
            elif ret.sym=='BTC':
                ret.quantity=abs(self.amt(row[10]))
            elif ret.sym=='ETH':
                ret.quantity=abs(self.amt(row[13]))
            ret.gross=None
            ret.fee=0
            ret.address=row[23].lower()  #for WD only?
        return ret
    
class Bittrex(Importer):
    def parse(self, row, account='bittrex'):
        x=Obj()
        x.txid=row[0]
        x.pair=row[1]
        x.account=account
        t=row[2]
        typ='UNK'
        if t=='LIMIT_BUY':
            typ='BUY'
        elif t=='LIMIT_SELL':
            typ='SELL'
        elif t=='DEP':  #CHECK THIS
            typ='DEP'
        elif t=='WD':   #CHECK
            typ='WD'
        else:
            typ='UNK'
        x.action=typ
        x.quantity=abs(float(row[3]))
        #row[4] limit
        x.fee=abs(float(row[5]))  #commission UNITS?
        #print(x.pair)
        p1,p2=x.pair.split('-')
        x.sym=p2
        x.symopp=p1
        x.gross=float(row[6])
        s=row[8]  # Closed date
        #p1,p2,p3=dt.split(' ')
        dttime=datetime.datetime.strptime(s, '%m/%d/%Y %I:%M:%S %p')
        #print('{} => {}'.format(s, dttime))
        x.dt=dttime
        x.blockchain_tx=None
        return x


class Simple(Importer):
    #Simple basic CSV file (for manual entry of missing values)
    def parse(self, row, account='simple'):
        #print('parsing row:{}'.format(row))
        x=Obj()
        x.txid=None
        x.pair=None
        x.account=account
        x.action=row[3]
        x.quantity=abs(float(row[7]))
        x.gross=float(row[8])
        x.fee=abs(float(row[9]))  
        x.sym=row[5]
        x.symopp=row[6]
        s=row[0]+' '+row[1]
        dttime=datetime.datetime.strptime(s, '%m/%d/%Y %H:%M:%S')
        x.address=row[10].lower()
        x.note=row[12]
        x.dt=dttime
        x.blockchain_tx=row[11]
        return x


class Coinbase(Importer):
    def amt(self,s):
        #convert blank string to 0
        if len(s)<1:
            return 0
        return float(s)
    
    def parse(self, row, account='gemini'):
        #parse a row and set acct
        ret=Obj()
        if len(row) < 10:
            #line does not have proper number of parts in it
            return
        if row[0][0]!='2':
            #line does not begin with 201x
            return
        dtstr=row[0]
        dtstr=" ".join(row[0].split()[:2])
        dttime=datetime.datetime.strptime(dtstr, '%Y-%m-%d %H:%M:%S')  # note microseconds
        ret.dt=dttime
        ret.txid=None
        ret.account=account
        amount=float(row[2])
        notes=row[5]
        ret.quantity=abs(float(amount))
        ret.sym=row[3]
        ret.symopp=row[8]
        ret.gross=0
        ret.fee=0
        if amount<0:
            if notes.startswith('Sold'):
                pass
            else:
                ret.action='WD'
                fee=self.amt(row[9])
                ret.gross=self.amt(row[7])-fee
                ret.fee=fee
        else:
            if notes.startswith('Bought'):
                ret.action='BUY'
                fee=self.amt(row[9])
                ret.gross=self.amt(row[7])-fee
                ret.fee=fee
            elif notes.startswith('Congrats'):
                #This is a bonus, let's call it MINE so no error (and its income)
                ret.action='MINE'
                fee=self.amt(row[9])
                ret.gross=self.amt(row[7])-fee
                ret.fee=fee
            else:
                ret.action='DEP'
                ret.gross=0
                ret.fee=0
        ret.address=row[4].lower() #for WD transactions.  Can be an account name or bitcoin address, etc.
        ret.blockchain_tx=row[21]
        ret.note=row[5]
        #print(ret.__dict__)
        return ret


            
            
            
            
    
    
