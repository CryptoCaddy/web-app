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
import sys
import os
import argparse
import traceback
import datetime
from . import importer
sys.path.append("..")  # so we can include the tax-engine files
from tax_engine import tax
from tax_engine import utils

def read_addr_map(file, lowercase=True):
    #read the addr file and return the dict of addres->account mappings
    #lowercase: lower case all the addresses and mappings
    ret={}
    if file is None:
        return ret
    #raise ValueError('cannot find addr file {}'.format(file))
    with open(file,'rt') as fp:
        for line in fp:
            if len(line)<2 or line[0]=='#':
                continue
            parts=line.split()
            if len(parts)>=2:
                ret[parts[0].lower()]=parts[1].lower()
    #print('got addr mapping {}'.format(ret))
    return ret
            
def do_parser():
    parser = argparse.ArgumentParser(
        description="tax calculations",
        epilog='''
          process files from list.  They are assumed to be in same directory as file list
        ''')
    dfile='~/CryptoRecords/files.txt'
    dfile=os.path.expanduser(dfile)
    afile='~/CryptoRecords/addr.txt'
    afile=os.path.expanduser(afile)
    parser.add_argument('--file', help='file with list of files to import', type=str, default=dfile)
    parser.add_argument('--addr', help='file addr -> account mappings', type=str, default=afile)
    options = parser.parse_args()
    return options

class Obj:
    def __str__(self):
        return str(self.__dict__)

def run(options, price_cb=None):
    #options is argparser or other object with attributes used as options
    #If running from commandline, run  tornadotax/runlocal.py
    dir=os.path.dirname(options.file)
    #os.chdir
    txs=[]
    print('using file list in {}'.format(os.path.realpath(options.file)))
    with open(options.file, 'rt') as fp:
        for line in fp:
            #print('line={}'.format(line))
            if len(line)<2 or line[0]=='#':
                continue
            splits=line.split()
            if len(splits)!=3:
                print('bad line in file {} (need 3 entries):{}'.format(options.file, line.rstrip()))
                continue
            typ,acct,file=splits
            if typ=='bittrex':
                iobject=importer.Bittrex()
            elif typ=='gemini':
                iobject=importer.Gemini()
            elif typ=='simple':
                iobject=importer.Simple()
            elif typ=='coinbase':
                iobject=importer.Coinbase()
            else:
                print('{} not implemented yet'.format(typ))
                continue
            path=os.path.join(dir,file)
            print('opening {}'.format(os.path.realpath(path)))
            tx_count=0
            with open(path, encoding='utf-8') as csvfile:
                for i,row in enumerate(csv.reader(csvfile,delimiter=',')):
                    if i==0 or len(row)<3 or len(row[0])<2 or row[0][0]=='#':
                        continue
                    try:
                        x=iobject.parse(row, account=acct)
                        if x is not None:
                            #print(x)
                            txs.append(x)
                            tx_count+=1
                    except Exception as ex:
                        print('Error {}'.format(ex))
                        for i,a in enumerate(row):
                            print('{:4} {}'.format(i,a))
                        traceback.print_exc()
                print('read in {} transactions'.format(tx_count))
    #Now txs is the list of transactions.  We should sort, then process with tax stuff
    addr=read_addr_map(options.addr)
    txs_sorted=sorted(txs, key=lambda x: x.dt)
    xo=tax.Dep(addr=addr)
    for tx in txs_sorted:
        xo.addtx(tx)
    xo.report()
    del xo
    taxobj=tax.Tax(addr=addr, price_cb=price_cb)
    print('Starting transaction processing:')
    for tx in txs_sorted:
        try:
            print('\n*****adding:{} {} {}\n{}'.format(tx.action,tx.sym,tx.dt,tx))
            taxobj.addtx(tx)
        except Exception as ex:
            print('exception on tx={}'.format(tx))
            traceback.print_exc()
            sys.exit(1)
    return taxobj

        
            
            
            
            
    
    
